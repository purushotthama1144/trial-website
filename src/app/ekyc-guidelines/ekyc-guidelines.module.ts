import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EkycGuidelinesRoutingModule } from './ekyc-guidelines-routing.module';
import { EkycGuidelinesComponent } from './ekyc-guidelines.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EkycGuidelinesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EkycGuidelinesRoutingModule
  ]
})

export class EkycGuidelinesModule { }
