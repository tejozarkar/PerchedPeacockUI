import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleComponent } from './vehicle.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VehicleService } from '../shared/service/vehicle.service';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../shared/interceptor/http-interceptor.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [VehicleComponent],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    SharedModule
  ],
  providers: [VehicleService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }, ] 
})
export class VehicleModule { }
