import { Component, OnInit,  ViewChild, ElementRef} from '@angular/core';
import { Chart } from "chart.js";
import * as firebase from 'firebase';

@Component({
  selector: 'app-detailed-report',
  templateUrl: './detailed-report.page.html',
  styleUrls: ['./detailed-report.page.scss'],
})
export class DetailedReportPage implements OnInit {
  @ViewChild("barCanvas",{ static: true }) barCanvas: ElementRef;
  private barChart: Chart;
  successfulRakaat: number;
  unSuccessfulRakaat: number;
  sunatRakaat: number;

  constructor() { }

  ngOnInit() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Subuh", "Zohor", "Asar", "Maghrib", "Isya'"],
        datasets: [
          {
            label: "# of Successful Solat",
            data: [3, 5, 4, 5, 1],
            backgroundColor: [
              "rgba(0, 255, 0, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(0, 255, 0, 0.5)"
            ],
            borderColor: [
              "rgba(0, 255, 0, 1)",
              "rgba(0, 255, 0, 1)",
              "rgba(0, 255, 0, 1)",
              "rgba(0, 255, 0, 1)",
              "rgba(0, 255, 0, 1)"
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
  }
  onGet(){
    firebase.firestore().collection('Report').doc(firebase.auth().currentUser.uid).get().then
    (doc => {
      this.successfulRakaat = doc.data().Successful_rakaat
      this.unSuccessfulRakaat = doc.data().Unsuccessful_rakaat
      this.sunatRakaat = doc.data().Sunat_rakaat
    })

    return this.successfulRakaat,this.unSuccessfulRakaat,this.sunatRakaat
    console.log('okay')

  }
}



   