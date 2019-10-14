import { Component, OnInit } from '@angular/core';
import { BookingService } from '../shared/service/booking.service';
import { Booking } from '../shared/model/Booking';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [DatePipe]
})
export class BookingComponent implements OnInit {

  public bookings = new Array<Booking>();
  public selectedBookingIndex = 0;

  constructor(private readonly bookingService: BookingService,
    private readonly datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getBookings();
  }

  private getBookings() {
    this.bookingService.getBookings()
      .subscribe(bookings => this.bookings = bookings.reverse());
      
  }

  public selectBooking(index: number): void {
    this.selectedBookingIndex = index;
  }

  public checkout(booking: Booking) {
    const currentDayTime = this.datePipe.transform(new Date(), 'dd-M-yyyy hh:mm:ss ');
    booking.checkout = currentDayTime;
    this.bookingService.checkout(booking)
      .subscribe(resp => {
        booking.amount = resp.amount;
      });
  }
}
