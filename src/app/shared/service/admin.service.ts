import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ParkingSpace } from '../model/ParkingSpace';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http: HttpClient) { }

  public createParkingSpace(parkingSpace: ParkingSpace) {
    return this.http.post('http://localhost:8080/parking-space', parkingSpace);
  }

  public findParkingSpaces(lat: number, lng: number, d: number) {
    const httpParams = new HttpParams()
      .set('lat', lat.toString())
      .set('lng', lng.toString())
      .set('d', d.toString()
      );
    return this.http.get('http://localhost:8080/parking-space/findByDistance',
      {
        params: httpParams
      });
  }
}
