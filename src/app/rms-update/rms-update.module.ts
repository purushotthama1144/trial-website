import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RmsUpdateRoutingModule } from './rms-update-routing.module';
import { RmsUpdateComponent } from './rms-update.component';
import { SharedModule } from '../shared/shared.module';
import { BlockedScripsComponent } from './blocked-scrips/blocked-scrips.component';
import { ExposureComponent } from './exposure/exposure.component';
import { BanSymbolComponent } from './ban-symbol/ban-symbol.component';
import { ExpiryContractsComponent } from './expiry-contracts/expiry-contracts.component';
import { TenderPeriodContractsComponent } from './tender-period-contracts/tender-period-contracts.component';
import { RmsUpdatesComponent } from './rms-updates/rms-updates.component';
import { BoCoMarginComponent } from './bo-co-margin/bo-co-margin.component';

@NgModule({
  declarations: [
    RmsUpdateComponent,
    BlockedScripsComponent,
    ExposureComponent,
    BanSymbolComponent,
    ExpiryContractsComponent,
    TenderPeriodContractsComponent,
    RmsUpdatesComponent,
    BoCoMarginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RmsUpdateRoutingModule
  ]
})
export class RmsUpdateModule { }