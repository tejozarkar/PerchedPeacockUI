import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from 'src/app/shared/model/vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private readonly http: HttpClient) { }

  public addVehicle(vehicle: Vehicle){
    return this.http.post('http://localhost:8080/vehicle', vehicle);
  }

  public getVehicles(): Observable<Vehicle[]>{ 
    return this.http.get<Vehicle[]>('http://localhost:8080/vehicle');
  }
}
