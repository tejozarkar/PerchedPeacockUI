import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from 'src/app/shared/model/Booking';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private readonly http: HttpClient) { }

  public createBooking(booking: Booking) {
    return this.http.post(environment.apiUrl+'/booking/create', booking);
  }

  public getBookings(): Observable<Array<Booking>>{
    return this.http.get<Array<Booking>>(environment.apiUrl+'/booking');
  }

  public checkout(booking: Booking): Observable<Booking>{
    return this.http.post<Booking>(environment.apiUrl+'/booking/checkout', booking);
  }
}
