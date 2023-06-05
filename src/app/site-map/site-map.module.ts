import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteMapRoutingModule } from './site-map-routing.module';
import { SiteMapComponent } from './site-map.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SiteMapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SiteMapRoutingModule
  ]
})
export class SiteMapModule { }