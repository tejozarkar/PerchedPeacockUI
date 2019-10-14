import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ParkingSpace } from '../../shared/model/ParkingSpace';
import { VehicleService } from 'src/app/shared/service/vehicle.service';
import { Vehicle } from 'src/app/shared/model/vehicle';
import { Booking } from 'src/app/shared/model/Booking';
import { ParkingLot } from 'src/app/shared/model/ParkingLot';
import { ParkingService } from '../../shared/service/parking.service';
import { DatePipe } from '@angular/common';
import { BookingService } from '../../shared/service/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking-space',
  templateUrl: './parking-space.component.html',
  styleUrls: ['./parking-space.component.scss'],
  providers: [DatePipe, BookingService]
})
export class ParkingSpaceComponent implements OnInit {


  @Input() parkingSpace: ParkingSpace;

  @Output() onAddingParkingSpace = new EventEmitter();
  @Output() onDetailsClose = new EventEmitter();

  public vehicles: Vehicle[];
  public selectedVehicle = 0;
  public availableParkingLot: ParkingLot;

  constructor(private readonly vehicleService: VehicleService,
    private readonly parkingService: ParkingService,
    private readonly bookingService: BookingService,
    private readonly datePipe: DatePipe,
    private readonly router: Router) { }

  ngOnInit() {
    this.vehicleService.getVehicles()
      .subscribe(vehicles => {
        this.vehicles = vehicles
        if(vehicles){
          this.checkParkingAvailability(vehicles[0]);
        }
      });
  }

  private checkParkingAvailability(vehicle: Vehicle){
    this.parkingService.getAvailableParkingLots(this.parkingSpace.id, vehicle.type)
    .subscribe(parkingLot => this.availableParkingLot = parkingLot);
  }

  public detailsClose() {
    this.onDetailsClose.emit();
  }

  public selectVehicle(index: number) {
    this.selectedVehicle = index;
    this.checkParkingAvailability(this.vehicles[this.selectedVehicle]);
  }

  public book() {
    const currentDayTime = this.datePipe.transform(new Date(), 'dd-M-yyyy hh:mm:ss ');
    let booking = new Booking();
    booking.vehicleId = this.vehicles[this.selectedVehicle].id;
    booking.lotId = this.availableParkingLot.id;
    booking.checkin = currentDayTime
    this.bookingService.createBooking(booking)
      .subscribe(resp => this.router.navigate(['booking']));
  }


}
