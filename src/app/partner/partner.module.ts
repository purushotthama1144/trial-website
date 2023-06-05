import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerComponent } from './partner.component';
import { SharedModule } from '../shared/shared.module';
import { PotentialCalculatorComponent } from './potential-calculator/potential-calculator.component';

@NgModule({
  declarations: [
    PartnerComponent,
    PotentialCalculatorComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    PartnerRoutingModule,

  ]
})
export class PartnerModule { }