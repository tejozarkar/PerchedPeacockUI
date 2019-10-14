import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../shared/service/admin.service';
import { ParkingSpace } from '../../shared/model/ParkingSpace';
import { Address } from '../../shared/model/Address';
import { GeoLocation } from '../../shared/model/GeoLocation';
import { NgForm } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-add-parking-space',
  templateUrl: './add-parking-space.component.html',
  styleUrls: ['./add-parking-space.component.scss']
})
export class AddParkingSpaceComponent implements OnInit {

  @Input() set geoLocation(loc) {
    this.parkingSpace.address = new Address();
    this.parkingSpace.address.geoLocation = loc;
  }

  @Output() onAddingParkingSpace = new EventEmitter();
  @Output() onDetailsClose = new EventEmitter();

  public parkingSpace = new ParkingSpace();

  constructor(private readonly adminService: AdminService,
    private readonly snackbar: SnackbarService) { }

  ngOnInit() {

  }

  public addParkingSpace(form: NgForm) {
    if (form.valid) {
      this.adminService.createParkingSpace(this.parkingSpace)
        .subscribe(resp => {
          this.onAddingParkingSpace.emit(resp);
          this.snackbar.show('Parking Space created');
        });
    } else {
      this.snackbar.show('Please fill all details', 'danger');
    }
  }

  public detailsClose() {
    this.onDetailsClose.emit();
  }

}
