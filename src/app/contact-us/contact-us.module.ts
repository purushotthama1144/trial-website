import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    ContactUsComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgmCoreModule.forRoot({
      // https://maps.googleapis.com/maps/api/js?key=AIzaSyAhPx3GAcQuYZbpXoDUUdITOKeOEOoYoWw&callback=initMap
      apiKey: 'AIzaSyAhPx3GAcQuYZbpXoDUUdITOKeOEOoYoWw'
    }),
    ContactUsRoutingModule
  ]
})
export class ContactUsModule { }