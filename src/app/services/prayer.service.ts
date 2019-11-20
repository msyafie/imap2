import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import  {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PrayerService {


  url ='https://waktu-solat-api.herokuapp.com/api/v1/prayer_times.json?zon=';


  constructor(private http: HttpClient) { }

 getData( zon){
 let params = new HttpParams ()
 //.set('negeri', negeri)
 .set('zon', zon)
 

 return this.http.get(this.url, {params});
 }


}
