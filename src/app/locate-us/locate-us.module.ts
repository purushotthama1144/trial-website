import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocateUsRoutingModule } from './locate-us-routing.module';
import { LocateUsComponent } from './locate-us.component';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';

@NgModule({
  declarations: [
    LocateUsComponent,
    LocationDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LocateUsRoutingModule,
    AgmCoreModule.forRoot({
      // https://maps.googleapis.com/maps/api/js?key=AIzaSyAhPx3GAcQuYZbpXoDUUdITOKeOEOoYoWw&callback=initMap
      apiKey: 'AIzaSyAhPx3GAcQuYZbpXoDUUdITOKeOEOoYoWw'
    }),
  ]
})
export class LocateUsModule { }