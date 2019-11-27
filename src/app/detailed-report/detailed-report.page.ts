import { Component, OnInit,  ViewChild, ElementRef} from '@angular/core';
import { Chart } from "chart.js";

@Component({
  selector: 'app-detailed-report',
  templateUrl: './detailed-report.page.html',
  styleUrls: ['./detailed-report.page.scss'],
})
export class DetailedReportPage implements OnInit {
  @ViewChild("barCanvas",{ static: true }) barCanvas: ElementRef;
  private barChart: Chart;

  constructor() { }

  ngOnInit() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Subuh", "Zohor", "Asar", "Maghrib", "Isya'"],
        datasets: [
          {
            label: "# of Successful Rakaat",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
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
  }
}



   