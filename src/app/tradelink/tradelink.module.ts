import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradelinkRoutingModule } from './tradelink-routing.module';
import { TradelinkComponent } from './tradelink.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TradelinkComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TradelinkRoutingModule
  ]
})
export class TradelinkModule { }