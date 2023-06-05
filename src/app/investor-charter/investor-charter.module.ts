import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestorCharterRoutingModule } from './investor-charter-routing.module';
import { InvestorCharterComponent } from './investor-charter.component';

@NgModule({
  declarations: [
    InvestorCharterComponent
  ],
  imports: [
    CommonModule,
    InvestorCharterRoutingModule
  ]
})
export class InvestorCharterModule { }