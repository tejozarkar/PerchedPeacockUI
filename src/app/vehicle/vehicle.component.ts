import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../shared/model/vehicle';
import { VehicleService } from '../shared/service/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  public vehicle = new Vehicle();
  public vehicles: Vehicle[];

  constructor(private readonly vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  public addVehicle() {
    this.vehicleService.addVehicle(this.vehicle)
      .subscribe(resp => {
        console.log(resp);
      })
  }

}
