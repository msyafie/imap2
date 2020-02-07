from flask import Flask, request, jsonify 
import numpy as np
import pickle
import keras
import firebase_admin
from firebase_admin import firebase

app = Flask(__name__)

@app.route('/api/v1/identifysolat', methods=['POST'])
def identifySolat():
    # get JSON from request. The JSON should be like this: { "data": [[[],[],[],[],[]]] }
    requestPayload = request.json

    # defines params
    sample = 1
    timesteps = 1764
    features = 12

    # checks if "data" is missing in the JSON
    if 'data' in requestPayload:
        data = requestPayload['data']
        dataArr = np.array(data)

        # Get a database reference to blog.
        ref = firebase.reference('https://solat1.firebaseio.com/solatReport')
        solatReport_ref = ref.child('solatReport')

        # checks input dimension (3D)
        if len(dataArr.shape) == 3:
            # correct dimension
            if dataArr.shape == (sample, timesteps, features):
                targetStr, targetInt = makePrediction(dataArr)
                solatReport_ref.set({
                    '55fi7U1pwSgJFGPjwl87' : {
                        'prayer_status' : targetStr,
                        'rakaat_amount' : targetInt
                    }
                })
                return jsonify({'status': True, 'prediction': targetStr, 'target': targetInt})

            # insufficient timesteps: padding with 0's
            elif dataArr.shape[0] == sample and dataArr.shape[1] < timesteps and dataArr.shape[2] == features:
                dataLen = dataArr.shape[1]
                missingLen = 1764 - dataLen
                reshapeData = [np.array([0]*12) for i in range(missingLen)]
                for xyz in dataArr[0]:
                    reshapeData.append(xyz)
                dataArr = np.array([np.array(reshapeData)])

                targetStr, targetInt = makePrediction(dataArr)
                solatReport_ref.set({
                    '55fi7U1pwSgJFGPjwl87' : {
                        'prayer_status' : targetStr,
                        'rakaat_amount' : targetInt
                    }
                })
                return jsonify({'status': True, 'prediction': targetStr, 'target': targetInt})

            # timesteps exceeds: truncating
            elif dataArr.shape[0] == 1 and dataArr.shape[1] > 1764 and dataArr.shape[2] == 12:
                dataArr = np.array([dataArr[0][dataArr.shape[1] - timesteps:]])
                targetStr, targetInt = makePrediction(dataArr)
                solatReport_ref.set({
                    '55fi7U1pwSgJFGPjwl87' : {
                        'prayer_status' : targetStr,
                        'rakaat_amount' : targetInt
                    }
                })
                return jsonify({'status': True, 'prediction': targetStr, 'target': targetInt})

            # wrong input dimension. Input not 3D
            else:
                return jsonify({'status': False, 'message': 'wrong shape'})

        # wrong input dimension. Input not 3D
        else:
            return jsonify({'status': False, 'message': 'wrong shape'})

    # send error message when "data" is missing
    else:
        return jsonify({'status': False, 'message': 'could not find data'})


def makePrediction(dataArr):
    print(dataArr.shape)
    targets = ['Rakaat 1 & Rakaat 3', 'Rakaat 2 & Rakaat 4']

    model = pickle.load(open('model/solatModel.sav', 'rb'))
    predictions = model.predict_classes(dataArr)
    predictions = predictions.flatten()

    return targets[predictions[0]], str(predictions[0])


if __name__ == '__main__':
    app.run(debug=True)
