import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { WeatherService} from '../services/weather.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SettingwPage } from '../settingw/settingw.page';
import { Platform, NavParams,NavController } from '@ionic/angular';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {

  location: {
    city: string,
    country: string
  }

  ampm: any;
  cityName: string;
  country: string;
  weather: string;
  icon: string;
  temp: string;
  tempMax: string;
  tempMin: string;
  day: string;
  windSpeed: string;
  humidity: string;
  pressure: any;
  sunriseHour: any;
  sunriseMinute: any;
  sunsetHour: any;
  sunsetMinute: any;
  looksLike: string;



  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private service: WeatherService,
    private router: Router,
    private modal: ModalController) { }
    

    // Show Modal
  async cityChange() {
    const modal = await this.modal.create({
      component: SettingwPage,
    });

    // Reload page once modal closes
    modal.onDidDismiss().then (_ => {
      this.ngOnInit();
    });

    return await modal.present();
  }

  getTimeOfDay() {
    let time = new Date().getHours();
    this.ampm = time;
    console.log(time)
  }

  // Switch statement to get day of week .
  getDay () {
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

   // Function to turn API milliseconds to minutes
   milliToMinutes (milliseconds) {
    return new Date(milliseconds * 1000).getMinutes();
  }

   // Function to turn API milliseconds to hour
  milliToHour(milliseconds) {
    return ((new Date(milliseconds * 1000).getHours() + 11) % 12 + 1); 
  }


  ngOnInit() {

    // Get storage on page load
    this.storage.get('location').then((val) => {
      if(val != null){
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city: 'Kuala Lumpur',
          country: 'MY'
        }
      }
    //API call to get data
    this.service.getData(this.location.city,this.location.country).subscribe((res:any) => {
      console.log('getData',res);
      this.cityName = res.name;
      this.country = res.sys.country;
      this.weather = res.weather[0].main;
      this.icon = 'http://openweathermap.org/img/w/'+res.weather[0].icon+'.png'; 
      this.temp = res.main.temp.toFixed(1);
      this.tempMax = res.main.temp_max.toFixed(1);
      this.tempMin = res.main.temp_min.toFixed(1);
      this.windSpeed = res.wind.speed;
      this.humidity = res.main.humidity;
      this.pressure = (res.main.pressure / 33.864).toFixed(1);
      this.sunriseHour =  this.milliToHour(res.sys.sunrise);
      this.sunriseMinute = this.milliToMinutes(res.sys.sunrise);
      this.sunsetHour = this.milliToHour(res.sys.sunset);
      this.sunsetMinute = this.milliToMinutes(res.sys.sunset);
      this.looksLike = res.weather[0].description;
      });
    });
 
 
    // Get Day
    this.getDay();
 
 
    this.getTimeOfDay();
  }
  backD() {
    this.navCtrl.navigateForward('/dashboard');
  }

  

}
