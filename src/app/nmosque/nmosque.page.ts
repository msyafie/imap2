import { Component,NgZone } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from 'loading.service';
import { NavController } from '@ionic/angular';

declare var google;
@Component({
  selector: 'app-nmosque',
  templateUrl: './nmosque.page.html',
  styleUrls: ['./nmosque.page.scss'],
})
export class NmosquePage {

  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  nearbyItems: any = new Array<any>();
  loading: any;

  constructor(
    public zone: NgZone,
    public loadingCtrl: LoadingController,
    private navCtrl: NavController,
    public isloading: LoadingService,
  ) { 
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.loading = this.loadingCtrl.create();

  }

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }
  async selectSearchResult(item){
    const loading = await this.loadingCtrl.create({
      message: 'Loading',
    });
    loading.present();
    this.autocompleteItems = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        this.autocompleteItems = [];
        this.GooglePlaces.nearbySearch({
          location: results[0].geometry.location,
          radius: '500',
          types: ['mosque'], //check other types here https://developers.google.com/places/web-service/supported_types
          key: 'AIzaSyDsggnlDQ6iz5CapY_vpR0K2-VjJz5Jut4&libraries=places'
        }, (near_places) => {
          this.zone.run(() => {
            this.nearbyItems = [];
            for (var i = 0; i < near_places.length; i++) {
              this.nearbyItems.push(near_places[i]);
            }
            this.isloading.dismiss();
          });
        })
      }
    })
    
  }
  

  backD() {
    this.navCtrl.navigateForward('/dashboard');
  }

}
