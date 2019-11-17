import { Component, OnInit } from '@angular/core';
import { CalculateService } from '../services/calculate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculate-distance',
  templateUrl: './calculate-distance.page.html',
  styleUrls: ['./calculate-distance.page.scss'],
})
export class CalculateDistancePage implements OnInit {

  location_distance ;
  destination_address ;
  origin_address ;
  travel_duration ;
  location ;

  constructor(private calculateService : CalculateService,
    private router: Router) { }

  backagain() {
    this.router.navigateByUrl('/tabs/tab3');
  }

  ngOnInit() {

    this.location_distance=null;
    this.destination_address=null;
    this.origin_address=null;
    this.travel_duration=null;
    this.location=null;
  }

  reset(){
    this.location_distance=null;
    this.destination_address=null;
    this.origin_address=null;
    this.travel_duration=null;
    this.location=null;
  }

  async changeDistance(location)
  {



      var results = await this.calculateService.calDistance('jabalpur',location)
      results.subscribe(res=>{
      console.log(res)
      this.location_distance = res['rows']['0']['elements']['0']['distance']['text'];
      this.destination_address = res['destination_addresses'];
      this.origin_address = res['origin_addresses'];
      this.travel_duration = res['rows']['0']['elements']['0']['duration']['text'];
    
    }); 
  }

  
  async changeLocation(){
    await this.calculateService.getCurrentLoc();
  }

}
