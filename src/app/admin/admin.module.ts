import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { AddParkingSpaceComponent } from './add-parking-space/add-parking-space.component';
import { AdminService } from '../shared/service/admin.service';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../shared/interceptor/http-interceptor.service';

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    AddParkingSpaceComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    AdminService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },]
})
export class AdminModule { }
