import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solat-report',
  templateUrl: './solat-report.page.html',
  styleUrls: ['./solat-report.page.scss'],
})
export class SolatReportPage implements OnInit {
  today: number;

  constructor() { }

  ngOnInit() {
    this.today = Date.now();
  }

}
