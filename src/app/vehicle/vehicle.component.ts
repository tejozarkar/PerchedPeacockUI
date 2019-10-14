import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../shared/model/vehicle';
import { VehicleService } from '../shared/service/vehicle.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../shared/service/snackbar.service';
import { NgForm } from '@angular/forms';

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

  public addVehicle(form: NgForm) {
    if(form.valid){
      this.vehicleService.addVehicle(this.vehicle)
        .subscribe(resp => {
          this.snackbar.show('Vehicle added');
          this.router.navigate(['/home']);
        });
    }else{
      this.snackbar.show('Please fill all fields', 'danger');
    }
  }

  public findHasError(form: NgForm, control: string) {
    if(form.controls.hasOwnProperty(control)){
      return form.controls[control].touched && form.controls[control].status == 'INVALID';
    }
    return null;
  }


}
