import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigipromoRoutingModule } from './digipromo-routing.module';
import { DigipromoComponent } from './digipromo.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DigipromoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DigipromoRoutingModule
  ]
})
export class DigipromoModule { }