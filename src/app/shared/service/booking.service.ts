import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from 'src/app/shared/model/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private readonly http: HttpClient) { }

  public createBooking(booking: Booking) {
    return this.http.post('http://localhost:8080/booking/create', booking);
  }
}
