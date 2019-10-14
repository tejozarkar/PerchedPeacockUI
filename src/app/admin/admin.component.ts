import { ElementRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ParkingSpace } from '../shared/model/ParkingSpace';
import { GeoLocation } from '../shared/model/GeoLocation';
import { AdminService } from '../shared/service/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public geoLocation = new GeoLocation();
  public currentGeoLocation = new GeoLocation();
  public searchControl: FormControl;
  public zoom: number;
  public showSpaceDetails = false;

  public parkingSpaces: ParkingSpace[];

  @ViewChild("search", { static: false })
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private readonly adminService: AdminService
  ) { }

  ngOnInit() {

    this.parkingSpaces = [];
    //set google maps defaults
    this.zoom = 4;
    this.currentGeoLocation.latitude = 12.916023;
    this.currentGeoLocation.longitude = 77.6379239;

    this.findNearBySpaces();

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.currentGeoLocation.latitude = place.geometry.location.lat();
          this.currentGeoLocation.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.findNearBySpaces();
        });
      });
    });
  }

  private setCurrentPosition(): void {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentGeoLocation.latitude = position.coords.latitude;
        this.currentGeoLocation.longitude = position.coords.longitude;
        this.zoom = 12;
        this.findNearBySpaces();
      });
    }
  }
  
  public findNearBySpaces(){
    this.adminService.findParkingSpaces(
      this.currentGeoLocation.latitude, 
      this.currentGeoLocation.longitude, 
      1)
      .subscribe((resp: Array<ParkingSpace>) => {
        resp.forEach(parkingSpace => {
          this.parkingSpaces.push(parkingSpace);
        })
      })
  }
  public parkingSpaceSelected(): void {
    this.showSpaceDetails = !this.showSpaceDetails;
  }


  public mapClick(e) {
    this.geoLocation.latitude = e.coords.lat;
    this.geoLocation.longitude = e.coords.lng;
    this.parkingSpaceSelected();
    // this.parkingSpaces.push({
    //   name: '',
    //   address: {
    //     geoLocation: {
    //       latitude: e.coords.lat,
    //       longitude: e.coords.lng
    //     }
    //   }
    // });
  }

  public onAddingParkingSpace(parkingSpace: ParkingSpace) {
    this.showSpaceDetails = false;
    this.parkingSpaces.push(parkingSpace);
  }
}
