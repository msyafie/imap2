import { Component, OnInit } from '@angular/core';
import { PrayerService } from 'src/app/services/prayer.service';
import { FormsModule } from '@angular/forms';
import { Platform, NavParams,NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-prayertime',
  templateUrl: './prayertime.page.html',
  styleUrls: ['./prayertime.page.scss'],
})
export class PrayertimePage implements OnInit {

 negeri :string;
 zon:string;
 zons: string ;
 data :any ;
 subuh:string ;
 syuruk:string;
 zohor:string;
 asar :string;
 maghrib: string;
 isyak : string;
 formattedDate: string;
 day:string;
 
 zonn:string;
 negeris:string;
 


  constructor(
     private navCtrl: NavController,
     private prayerService: PrayerService,
     private router: Router,
     private storage:Storage
     ) {


   }

  ngOnInit() {
   
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

    
   
    //this. getLocate(this.zon="petaling")
    this.getLocation(this.zon);
    this.getFormattedDate();
    this.getDay();
    
    
  }


//query zon from api
getLocation(zon){
    this.prayerService.getData(zon).subscribe((data)=>{
    this.data= JSON.stringify(data);
     // console.log( 'getData',data);
      var obj =<any> data;
        this.zons=obj.data[0].zon;
        this.zonn= this.zons.charAt(0).toUpperCase() + this.zons.slice(1).toLowerCase();
       this.negeri=obj.data[0].negeri;
       this.negeris=this.negeri.charAt(0).toUpperCase() + this.negeri.slice(1).toLowerCase();
       this.subuh=obj.data[0].waktu_solat[1].time;
       this.syuruk=obj.data[0].waktu_solat[2].time;
       this.zohor=obj.data[0].waktu_solat[3].time;
       this.asar=obj.data[0].waktu_solat[4].time;
       this.maghrib=obj.data[0].waktu_solat[5].time;
       this.isyak=obj.data[0].waktu_solat[6].time;
     

      
     
    })
   
  }
//default zon
 /*getLocate(zon="petaling"){
    this.prayerService.getData(zon).subscribe((data)=>{
      this.data= JSON.stringify(data);
     // console.log( 'getData',data);
      var obj =<any> data;
       this.zon=obj.data[0].zon;
       this.negeri=obj.data[0].negeri;
       this.subuh=obj.data[0].waktu_solat[1].time;
       this.syuruk=obj.data[0].waktu_solat[2].time;
       this.zohor=obj.data[0].waktu_solat[3].time;
       this.asar=obj.data[0].waktu_solat[4].time;
       this.maghrib=obj.data[0].waktu_solat[5].time;
       this.isyak=obj.data[0].waktu_solat[6].time;

       
    
    })
  }*/

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
  /*saveData(){
    var roofRef =firebase.database.ref();
    var child =roofRef.child('/prayer/subuh');
    var childRef=child.push();
    childRef.set(this.subuh);
  }*/

  
    
  backagain() {
    this.router.navigateByUrl('/tabs/tab3');
  }

  
  //zone =[ "pulau aur", "pulau pemanggil", "johor bharu", "kota tinggi", "mersing", "kluang", "pontian", "batu pahat", "muar", "segamat", "gemas johor", "kota setar", "kubang pasu", "pokok sena", "kuala muda ", "yan", "pendang", "padang terap", "sik", "baling", "bandar baharu", "kulim", "langkawi", "gunung jerai", "bachok", "kota bharu", "machang", "pasir mas", "pasir puteh", "tanah merah", "tumpat", "kuala krai", "mukim chiku", "gua musang", "jeli", "melaka", "tampin", "jempol", "jelebu", "kuala pilah", "port dickson", "rembau", "seremban", "pulau tioman", "kuantan", "pekan", "rompin", "muadzam shah", "jerantut", "temerloh", "maran", "bera", "chenor", "jengka", "bentong", "lipis", "raub", "genting sempah", "janda baik", "bukit tinggi", "cameron highlands", "genting highlands", "bukit fraser", "kangar", "padang besar", "arau","pulau pinang"];

  backD() {
    this.navCtrl.navigateForward('/dashboard');
  }

  //save location zon
  saveZon(){
    
    this.zon
    //list prayers
    this.subuh
    this.syuruk
    this.zohor
    this.asar
    this.maghrib
    this.isyak

    this.storage.set('zon',JSON.stringify(this.zon))
    this.storage.set('subuh',JSON.stringify(this.subuh))
    this.storage.set('syuruk',JSON.stringify(this.syuruk))
    this.storage.set('zohor',JSON.stringify(this.zohor))
    this.storage.set('asar',JSON.stringify(this.asar))
    this.storage.set('maghrib',JSON.stringify(this.maghrib))
    this.storage.set('isyak',JSON.stringify(this.isyak))

  }
 
}

