 import { Component, OnInit } from '@angular/core';
import { PrayerService } from 'src/app/services/prayer.service';
import { FormsModule } from '@angular/forms';
import { Platform, NavParams,NavController } from '@ionic/angular';

@Component({
  selector: 'app-prayertime',
  templateUrl: './prayertime.page.html',
  styleUrls: ['./prayertime.page.scss'],
})
export class PrayertimePage implements OnInit {

 negeri;
 zon ;
 data :any ;
 subuh ;
 syuruk;
 zohor;
 asar;
 maghrib;
 isyak;

  constructor(private prayerService: PrayerService) { }

  ngOnInit() {
    this. getLocate(this.zon="kuala lumpur")
    this.getLocation(this.zon);

  }


getLocation(zon){
    this.prayerService.getData(zon).subscribe((data)=>{
      this.data= JSON.stringify(data);
      console.log( 'getData',data);
      var obj =<any> data;
       this.zon=obj.data[0].negeri;
       this.negeri=obj.data[0].zon;
       this.subuh=obj.data[0].waktu_solat[1].time;
       this.syuruk=obj.data[0].waktu_solat[2].time;
       this.zohor=obj.data[0].waktu_solat[3].time;
       this.asar=obj.data[0].waktu_solat[4].time;
       this.maghrib=obj.data[0].waktu_solat[5].time;
       this.isyak=obj.data[0].waktu_solat[6].time;
       
    
    })
  }

 getLocate(zon="kuala lumpur"){
    this.prayerService.getData(zon).subscribe((data)=>{
      this.data= JSON.stringify(data);
      console.log( 'getData',data);
      var obj =<any> data;
       this.zon=obj.data[0].negeri;
       this.negeri=obj.data[0].zon;
       this.subuh=obj.data[0].waktu_solat[1].time;
       this.syuruk=obj.data[0].waktu_solat[2].time;
       this.zohor=obj.data[0].waktu_solat[3].time;
       this.asar=obj.data[0].waktu_solat[4].time;
       this.maghrib=obj.data[0].waktu_solat[5].time;
       this.isyak=obj.data[0].waktu_solat[6].time;
       
    
    })
  }
}

