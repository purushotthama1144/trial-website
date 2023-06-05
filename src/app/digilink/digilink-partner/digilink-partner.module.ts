import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigilinkPartnerRoutingModule } from './digilink-partner-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DigilinkPartnerComponent } from './digilink-partner.component';

@NgModule({
  declarations: [
    DigilinkPartnerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DigilinkPartnerRoutingModule
  ]
})
export class DigilinkPartnerModule { }