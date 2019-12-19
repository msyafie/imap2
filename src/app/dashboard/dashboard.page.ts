import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('barCanvas',{ static: true }) barCanvas: ElementRef;

  private barChart: Chart;

  constructor(
    private navCtrl: NavController,
    public alertController: AlertController,
    ) {
  }
  
  state = {
    status: true
  }

  message 

  ngOnInit() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Subuh", "Zohor", "Asar", "Maghrib", "Isya'"],
        datasets: [
          {
            label: "# of Successful Rakaat",
            data: [0, 1, 1, 1, 0],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(153, 102, 255, 0.5)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(0, 255, 0, 1)",
              "rgba(0, 255, 0, 1)",
              "rgba(0, 255, 0, 1)",
              "rgba(153, 102, 255, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

    firebase.firestore().collection('user').where("uid","==", firebase.auth().currentUser.uid).onSnapshot
    (doc => {
      doc.docChanges().forEach(docinfo =>{
        this.state.status = docinfo.doc.data().status
        if(this.state.status === false){
          this.message = "inactive"
        }
        else{
          this.message = "active"
        }
      })     
    })


  }
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          this.goToLogin();
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  onUpdates(){
    var currentUID = firebase.auth().currentUser.uid
    firebase.firestore().collection('user').doc(currentUID).update({
              status : false
            })

    this.updateStatusAlert()
    console.log('okay')
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
  goToMosque() {
    this.navCtrl.navigateForward('/tabs/nmosque');
  }
  goToMusafir() {
    this.navCtrl.navigateForward('/tabs/tab3');
  }
  goToRestaurant() {
    this.navCtrl.navigateForward('/tabs/tab2');
  }
  goMap() {
    this.navCtrl.navigateForward('/tabs/tab6');
  }
  goToSolatTime() {
    this.navCtrl.navigateForward('/tabs/tab5');
  }
  goToWeather(){
    this.navCtrl.navigateForward('tabs/tab9');
  }
  goToLogin(){
    this.navCtrl.navigateForward('login');
  }

}
