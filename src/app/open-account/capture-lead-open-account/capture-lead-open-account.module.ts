import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptureLeadOpenAccountRoutingModule } from './capture-lead-open-account-routing.module';
import { CaptureLeadOpenAccountComponent } from './capture-lead-open-account.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CaptureLeadOpenAccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CaptureLeadOpenAccountRoutingModule
  ]
})
export class CaptureLeadOpenAccountModule { }