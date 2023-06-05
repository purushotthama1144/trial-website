import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundTransferRoutingModule } from './fund-transfer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FundTransferComponent } from './fund-transfer.component';

@NgModule({
  declarations: [
    FundTransferComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FundTransferRoutingModule
  ]
})

export class FundTransferModule { }