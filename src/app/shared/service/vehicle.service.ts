import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from 'src/app/shared/model/vehicle';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private readonly http: HttpClient) { }

  public addVehicle(vehicle: Vehicle){
    return this.http.post(environment.apiUrl+'/vehicle', vehicle);
  }

  public getVehicles(): Observable<Vehicle[]>{ 
    return this.http.get<Vehicle[]>(environment.apiUrl+'/vehicle');
  }
}
