import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../shared/model/vehicle';
import { VehicleService } from '../shared/service/vehicle.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../shared/service/snackbar.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  public vehicle = new Vehicle();
  public vehicles: Vehicle[];

  constructor(
    private readonly router: Router,
    private readonly vehicleService: VehicleService,
    private readonly snackbar: SnackbarService) { }

  ngOnInit() {
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  public addVehicle() {
    this.vehicleService.addVehicle(this.vehicle)
      .subscribe(resp => {
        this.snackbar.show('Vehicle added');
        this.router.navigate(['/home']);
      });
  }

}
