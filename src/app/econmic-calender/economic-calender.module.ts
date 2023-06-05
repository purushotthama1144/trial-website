import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EconomicCalenderRoutingModule } from './economic-calender-routing.module';
import { EconmicCalenderComponent } from './econmic-calender.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EconmicCalenderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EconomicCalenderRoutingModule
  ]
})
export class EconomicCalenderModule { }