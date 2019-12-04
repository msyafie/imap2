import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-solat-report',
  templateUrl: './solat-report.page.html',
  styleUrls: ['./solat-report.page.scss'],
})
export class SolatReportPage implements OnInit {
  today: number;
  startDate: Date;
  endDate: Date;
  successfulRakaat: number;
  unSuccessfulRakaat: number;
  sunatRakaat: number;
  customPickerOptions: any;

  constructor() { }

  ngOnInit() {
    this.today = Date.now();

  }
  onGet(){
    firebase.firestore().collection('Report').doc(firebase.auth().currentUser.uid).get().then
    (doc => {
      this.successfulRakaat = doc.data().Successful_rakaat
      this.unSuccessfulRakaat = doc.data().Unsuccessful_rakaat
      this.sunatRakaat = doc.data().Sunat_rakaat
    })

    return status 
    console.log('okay')

  }
}
