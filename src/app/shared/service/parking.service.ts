import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkingLot } from 'src/app/shared/model/ParkingLot';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor(private readonly http: HttpClient) { }

  public getAvailableParkingLots(id: string, type: number) : Observable<ParkingLot>{
    const params = new HttpParams()
    .set('id', id)
    .set('type', type.toString());
    return this.http.get<ParkingLot>('http://localhost:8080/parking-lot',{
      params
    });
  }
}
