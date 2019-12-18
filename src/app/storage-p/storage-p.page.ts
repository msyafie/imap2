import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, LoadingController } from '@ionic/angular';
import { PrayerService } from 'src/app/services/prayer.service';
@Component({
  selector: 'app-storage-p',
  templateUrl: './storage-p.page.html',
  styleUrls: ['./storage-p.page.scss'],
})
export class StoragePPage implements OnInit {

  subuh :string;
  constructor(
    private storage: Storage,
    private modal: ModalController,
    private loader: LoadingController,
    private prayerService: PrayerService,
    
    ) { 
       this.storage.get('Subuh').then((val)=>{
         this.subuh =val;
       });
    }

  ngOnInit() {
  }



}
