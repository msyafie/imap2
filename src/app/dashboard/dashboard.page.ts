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
  @ViewChild('doughnutCanvas',{ static: true }) doughnutCanvas: ElementRef;

  private doughnutChart: Chart;

  constructor(
    private navCtrl: NavController,
    public alertController: AlertController,
    ) {
  }
  
  state = {
    status
  }

  ngOnInit() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Subuh", "Zohor", "Asar", "Maghrib", "Isya'"],
        datasets: [
          {
            label: "Solat Status",
            data: [1, 1, 1, 1, 1],
            backgroundColor: [
              "rgba(75, 192, 192, 0.4)",
              "rgba(75, 192, 192, 0.4)",
              "rgba(75, 192, 192, 0.4)",
              "rgba(255, 99, 132, 0.4)",
              "rgba(255, 99, 132, 0.4)"
            ],
            hoverBackgroundColor: ["#2BA62E", "#2BA62E", "#2BA62E", "#FF6384", "#FF6384"]
          }
        ]
      }
    });
  }
  onGet(){
    firebase.firestore().collection('user').doc(firebase.auth().currentUser.uid).get().then
    (doc => {
      this.state.status = doc.data().status
    })

    return status 
    console.log('okay')

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
  goToQiblat() {
    this.navCtrl.navigateForward('https://qiblafinder.withgoogle.com');
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
}
