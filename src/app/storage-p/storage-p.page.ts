import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';
import { PrayerService } from 'src/app/services/prayer.service';
@Component({
  selector: 'app-storage-p',
  templateUrl: './storage-p.page.html',
  styleUrls: ['./storage-p.page.scss'],
})
export class StoragePPage implements OnInit {
  
  zon:string;

  subuh :string;
  syuruk:string;
  zohor:string;
  asar:string;
  maghrib:string;
  isyak:string;

  constructor(
    private router: Router,
    private storage: Storage,
    private modal: ModalController,
    private loader: LoadingController,
    private prayerService: PrayerService,
    
    ) { 

      //Get Storage Selected Zon
       this.storage.get('zon').then((val)=>{
         //console.log(val);

         if(val!=null){
           //if is not null, pull from storage
           let zon=JSON.parse(val);
           
         }
         else{
           //default to petaling
           this.zon= 'petaling';
         }
       });
    }


    //getLocation

    getCall(zon){
      
      
    }
  ngOnInit() {
  }



}
