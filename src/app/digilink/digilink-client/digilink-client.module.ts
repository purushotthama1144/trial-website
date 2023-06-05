import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigilinkClientRoutingModule } from './digilink-client-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DigilinkClientComponent } from './digilink-client.component';

@NgModule({
  declarations: [
    DigilinkClientComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DigilinkClientRoutingModule
  ]
})
export class DigilinkClientModule { }