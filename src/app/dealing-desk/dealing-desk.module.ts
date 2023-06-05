import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealingDeskRoutingModule } from './dealing-desk-routing.module';
import { DealingDeskComponent } from './dealing-desk.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DealingDeskComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DealingDeskRoutingModule
  ]
})
export class DealingDeskModule { }