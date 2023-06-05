import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingRoutingModule } from './pricing-routing.module';
import { PricingComponent } from './pricing.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PricingComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PricingRoutingModule,
  ]
})
export class PricingModule { }