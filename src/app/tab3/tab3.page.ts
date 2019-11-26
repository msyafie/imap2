import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';






@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    constructor(public navCtrl: NavController,
        public alertController: AlertController,
        private router: Router) {

    }

    

    etd: any;
    dos: any;
    state = {
      status
    }

    profile() {
      this.router.navigateByUrl('/calculate-distance');
    }

    onGet(){
      firebase.firestore().collection('user').doc(firebase.auth().currentUser.uid).get().then
      (doc => {
        this.state.status = doc.data().status
      })

      return status 
      console.log('okay')

    }
  logForm() {
 
    if(this.etd >= 90)
    {
        if(this.dos <= 3){
        this.presentAlertConfirm()
        console.log('yess')}

        else
        {
            this.ineligibleAlert2()
            console.log('no')

        }
        
    }
    else
    {
        this.ineligibleAlert()
        console.log('no')
    }
    
      
  }
  
  async ineligibleAlert() {
    const alert = await this.alertController.create({
      header: 'Musafir Verification',
      subHeader: 'Ineligible',
      message: 'You are ineligible to perform Solat Musafir due to insufficient travelling distance.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async ineligibleAlert2() {
    const alert = await this.alertController.create({
      header: 'Musafir Verification',
      subHeader: 'Ineligible',
      message: 'You are ineligible to perform Solat Musafir due to exceeded duration of staying.',
      buttons: ['OK']
    });

    await alert.present();
  }
   
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
        header: 'Musafir Verification',
        subHeader: 'Eligible',
        message: 'You are eligible to perform Solat Musafir.If you would like to change Musafir status click "Okay"',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
          //this one
           var  currentUID = firebase.auth().currentUser.uid
            firebase.firestore().collection('user').doc(currentUID).update({
              status : true
            })
            this.updateStatusAlert()
                        //what suppose to do here 
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async updateStatusAlert() {
    const alert = await this.alertController.create({
      header: 'Musafir Status',
      subHeader: 'Successful',
      message: 'Musafir status successfully updated !',
      buttons: ['OK']
    });

    await alert.present();
  }
}
