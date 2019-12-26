import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ModalController, LoadingController, NavController } from '@ionic/angular';
import { PrayerService } from 'src/app/services/prayer.service';
@Component({
  selector: 'app-storage-p',
  templateUrl: './storage-p.page.html',
  styleUrls: ['./storage-p.page.scss'],
})
export class StoragePPage implements OnInit {
  
  latitude;
  longitude;  
   prayer;
  
   city;
   country;
   country_code;
   Fajr;
   Dhuhr;
   Asr;
   Maghrib;
   Isha;
   gregorian;

   countryy;
   formattedDate;
   day;

  constructor(
    private router: Router,
    private storage: Storage,
    private modal: ModalController,
    private loader: LoadingController,
    private prayerService: PrayerService,
    private navCtrl: NavController,
    
    ) { 

      
      
    }


    
  ngOnInit() {

    this.getLocation();
    this.getCity(this.city);
    this.getFormattedDate();
    this.getDay();
  }





  getLocation(){
    if("geolocation" in navigator){
      console.log(" geolocation available");
      navigator.geolocation.watchPosition( async (success)=>{
      
      this.latitude = success.coords.latitude;
      this.longitude = success.coords.longitude;
      
      this.prayerService.getCity(this.latitude, this.longitude).subscribe(data=>{
          this.prayer =JSON.stringify(data);
          console.log('getData',data);
          var obj =<any> data;
          this.gregorian=obj.results.datetime[0].date.gregorian
          this.country = obj.results.location.country
          this.countryy= this.country.charAt(0).toUpperCase() + this.country.slice(1).toLowerCase();
          this.city =obj.results.location.city
          this.country_code =obj.results.location.country_code
          this.Fajr =  obj.results.datetime[0].times.Fajr
          this.Dhuhr= obj.results.datetime[0].times.Dhuhr
          this.Asr=  obj.results.datetime[0].times.Asr
          this.Maghrib =obj.results.datetime[0].times.Maghrib
          this.Isha=obj.results.datetime[0].times.Isha
       
     
      })
        
      
      
      })
    } else {
      console.log("geolocation not available");
    }
    }


    
    
   getCity(city){
      this.prayerService.getDataCity(city).subscribe((data :any) =>{
        this.prayer =JSON.stringify(data);
        console.log('getDataCity',data);
        var obj =<any> data;
        this.gregorian=obj.results.datetime[0].date.gregorian
        this.country = obj.results.location.country
        this.city =obj.results.location.city
        this.country_code =obj.results.location.country_code
        this.Fajr =  obj.results.datetime[0].times.Fajr
        this.Dhuhr= obj.results.datetime[0].times.Dhuhr
        this.Asr=  obj.results.datetime[0].times.Asr
        this.Maghrib =obj.results.datetime[0].times.Maghrib
        this.Isha=obj.results.datetime[0].times.Isha
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


  backagainn() {
    this.router.navigateByUrl('/dashboard');
  }

  backD() {
    this.navCtrl.navigateForward('/notifikasi');
  }
  }

