import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ParkingSpace } from '../model/ParkingSpace';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http: HttpClient) { }

  public createParkingSpace(parkingSpace: ParkingSpace) {
    return this.http.post(environment.apiUrl+'/parking-space', parkingSpace);
  }

  public findParkingSpaces(lat: number, lng: number, d: number) {
    const httpParams = new HttpParams()
      .set('lat', lat.toString())
      .set('lng', lng.toString())
      .set('d', d.toString()
      );
    return this.http.get(environment.apiUrl+'/parking-space/findByDistance',
      {
        params: httpParams
      });
  }
}
