import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from 'src/app/shared/model/Booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private readonly http: HttpClient) { }

  public createBooking(booking: Booking) {
    return this.http.post('http://localhost:8080/booking/create', booking);
  }

  public getBookings(): Observable<Array<Booking>>{
    return this.http.get<Array<Booking>>('http://localhost:8080/booking');
  }

  public checkout(booking: Booking): Observable<Booking>{
    return this.http.post<Booking>('http://localhost:8080/booking/checkout', booking);
  }
}
