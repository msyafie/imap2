import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, scheduled } from 'rxjs';
import { map } from 'rxjs/operators';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule, AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
//import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-notifikasi',
  templateUrl: './notifikasi.page.html',
  styleUrls: ['./notifikasi.page.scss'],
})
export class NotifikasiPage implements OnInit {

 prays= [];
 prayers =firebase.database().ref('/prayers');
 snapshot;
 subuh: string;
 syuruk: string;
 zohor:string;
 asar: string;
 maghrib:string;
 isyak:string;


  d = new Date();
  m = this.d.getMinutes();
  h = this.d.getHours();
  currentTime = this.h+":"+this.m;
  
  originalTime = new Date(Date.now() *1000).getTime();
  constructor(
    public navCtrl: NavController,
    private afstore:AngularFirestore,
    public db: AngularFireDatabase, 
    public http: HttpClient,
    public alertCtrl :AlertController,
    //public localNotifications:LocalNotifications,
    public platform: Platform,
  ) { 
    
  }

  ngOnInit() {
    
  }


  getsolatReport(){
    this.db.list('/prayers').valueChanges().subscribe((prayers) => { 
      console.log("datas", prayers)
    },(err)=>{
       console.log("probleme : ", err)
    
    });
  }
  
  getPray(){
    firebase.firestore().collection('Prayer').doc(firebase.auth().currentUser.uid).get().then
    (doc => {
      this.subuh = doc.data().Subuh
      this.syuruk = doc.data().Syuruk
      this.zohor = doc.data().Zohor
      this.asar = doc.data().Asar
      this.maghrib =doc.data().Maghrib
      this.isyak=doc.data().Isyak
    }
    
    )
    
     /* if(this.subuh = this.currentTime){
        //notify method
      }

      else(this.syuruk =this.currentTime){
        //notify method
      }*/
      
    return this.subuh,this.syuruk,this.zohor, this.asar, this.maghrib,this.isyak
    console.log('okay')

  }

}
