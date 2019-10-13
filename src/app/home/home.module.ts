import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { ParkingSpaceComponent } from './parking-space/parking-space.component';
import { VehicleService } from '../shared/service/vehicle.service';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../shared/interceptor/http-interceptor.service';
import { BookingService } from '../shared/service/booking.service';

@NgModule({
  declarations: [HomeComponent, MenuComponent, ParkingSpaceComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD2h0Bnj_6F8V7BzrT1eAEzzcagWQm2LEs",
      libraries: ["places"]
    }),
  ],
  providers: [
    VehicleService,
    BookingService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
