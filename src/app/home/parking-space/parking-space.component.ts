import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ParkingSpace } from '../../shared/model/ParkingSpace';
import { Address } from '../../shared/model/Address';
import { GeoLocation } from '../../shared/model/GeoLocation';
import { VehicleService } from 'src/app/shared/service/vehicle.service';
import { Vehicle } from 'src/app/shared/model/vehicle';
import { Booking } from 'src/app/shared/model/Booking';
import { ParkingLot } from 'src/app/shared/model/ParkingLot';
import { ParkingService } from '../../shared/service/parking.service';
import { DatePipe } from '@angular/common';
import { BookingService } from '../../shared/service/booking.service';

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
  public selectedVehicle: Vehicle;
  public availableParkingLot: ParkingLot;

  constructor(private readonly vehicleService: VehicleService,
    private readonly parkingService: ParkingService,
    private readonly bookingService: BookingService,
    private readonly datePipe: DatePipe) { }

  ngOnInit() {
    this.vehicleService.getVehicles()
      .subscribe(vehicles => {
        this.vehicles = vehicles
        console.log(vehicles);

        this.parkingService.getAvailableParkingLots(this.parkingSpace.id, vehicles[0].type)
          .subscribe(parkingLot => this.availableParkingLot = parkingLot);
      });
  }

  public detailsClose() {
    this.onDetailsClose.emit();
  }

  public selectVehicle(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
  }

  public book() {
    const currentDayTime = this.datePipe.transform(new Date(), 'dd-M-yyyy hh:mm:ss ');
    let booking = new Booking();
    booking.vehicleId = this.selectedVehicle.id;
    booking.lotId = this.availableParkingLot.id;
    booking.checkin = currentDayTime
    this.bookingService.createBooking(booking)
      .subscribe(resp => console.log(resp));
  }


}
