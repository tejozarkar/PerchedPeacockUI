import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [BookingComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD2h0Bnj_6F8V7BzrT1eAEzzcagWQm2LEs",
      libraries: ["places"]
    }),
  ]
})
export class BookingModule { }
