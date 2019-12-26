import { Component, OnInit } from '@angular/core';
import { PrayerService } from 'src/app/services/prayer.service';
import { FormsModule } from '@angular/forms';
import { Platform, NavParams,NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-notifikasi',
  templateUrl: './notifikasi.page.html',
  styleUrls: ['./notifikasi.page.scss'],
})
export class NotifikasiPage implements OnInit {

  latitude;
  longitude;   
  prayer;
  zone:string;
  data :any ;
  subuh:string ;
  syuruk:string;
  zohor:string;
  asar:string;
  maghrib:string;
  isyak:string;
 
  location:string;
  locations:string;
  locationss:string;
  locationsss:string;
  locationssss:string;
  locationsssss:string;
  locationssssss:string;
  locationsssssss:string;
  locationssssssss:string;
  locationsssssssss:string;

  formattedDate: string;
 day:string;

  //current time
d = new Date();
m = this.d.getMinutes();
h = this.d.getHours();
currentTime = this.h+this.m;


  constructor(
    private navCtrl: NavController,
     private prayerService: PrayerService,
     private router: Router,
     private storage:Storage
    ) {}

  ngOnInit() {

    //Get Storage Selected Zon
    this.storage.get('zone').then((val)=>{
      //console.log(val);

      if(val!=null){
        //if is not null, pull from storage
        let zon=JSON.parse(val);
        
      }
      else{
        //default to petaling
        this.zone= 'SGR01';
      }
    });
      
     //this.getLocation();
     this.getCity(this.zone);
     this.getFormattedDate();
    this.getDay();
  }



    getCity(zone){
      this.prayerService.getDataZon(zone).subscribe((data :any) =>{
        this.prayer =JSON.stringify(data);
        console.log('getDataCity',data);
        var obj =<any> data;
          this.location =obj.locations[5]
          this.locations =obj.locations[0]
          this.locationss =obj.locations[2]
          this.locationsss =obj.locations[3]
          this.locationssss =obj.locations[4]
          this.locationsssss =obj.locations[1]
          this.locationssssss =obj.locations[0]
          this.locationsssssss =obj.locations[7]
          this.locationssssssss =obj.locations[8]
          this.locationsssssssss =obj.locations[9]
          this.subuh =  obj.prayer_times.subuh.toUpperCase();
          this.syuruk= obj.prayer_times.syuruk.toUpperCase();
          this.zohor= obj.prayer_times.zohor.toUpperCase();
          this.asar=  obj.prayer_times.asar.toUpperCase();
          this.maghrib =obj.prayer_times.maghrib.toUpperCase();
          this.isyak=obj.prayer_times.isyak.toUpperCase();
      })
    }


//get Day of the week
getDay(){
  let date = new Date().getDay();
  switch(date) {
    case 0:
    this.day = 'Sunday';
    break;

    case 1:
    this.day = 'Monday';
    break;

    case 2:
    this.day = 'Tuesday';
    break;

    case 3:
    this.day = 'Wednesday';
    break;

    case 4:
    this.day = 'Thursday';
    break;

    case 5:
    this.day = 'Friday';
    break;

    case 6:
    this.day = 'Saturday';
    break;


  }
}

//get month of the year
getFormattedDate(){
  var dateObj =new Date()
  var year = dateObj.getFullYear().toString()
  var month =dateObj.getMonth().toString()
  var date =dateObj.getDate().toString()

  var monthArray =['January','Febuary','March','April','May','June',
  'July','August','September','October','November','December']
  this.formattedDate = date +' ' + monthArray[month] +' ' + year ;
}


  
backagain() {
  this.router.navigateByUrl('/dashboard');
}

backagainn() {
  this.router.navigateByUrl('/dahboard');
}

backD() {
  this.navCtrl.navigateForward('/dashboard');
}


  
}
