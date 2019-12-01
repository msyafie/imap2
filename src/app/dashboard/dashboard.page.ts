import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { NavController } from '@ionic/angular';
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
    private navCtrl: NavController
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
  goToQiblat() {
    this.navCtrl.navigateForward('https://qiblafinder.withgoogle.com');
  }
  goToMosque() {
    this.navCtrl.navigateForward('/nmosque');
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
    this.navCtrl.navigateForward('/prayertime');
  }
}
