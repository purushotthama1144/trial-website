import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareersRoutingModule } from './careers-routing.module';
import { CareersComponent } from './careers.component';
import { SharedModule } from '../shared/shared.module';
import { CareerDetailComponent } from './career-detail/career-detail.component';

@NgModule({
  declarations: [
    CareersComponent,
    CareerDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CareersRoutingModule
  ]
})

export class CareersModule { }