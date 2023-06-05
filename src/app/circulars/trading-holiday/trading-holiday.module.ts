import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradingHolidayRoutingModule } from './trading-holiday-routing.module';
import { TradingHolidayComponent } from './trading-holiday.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { McxHolidayComponent } from './mcx-holiday/mcx-holiday.component';
import { NseHolidayComponent } from './nse-holiday/nse-holiday.component';

@NgModule({
  declarations: [
    TradingHolidayComponent,
    McxHolidayComponent,
    NseHolidayComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TradingHolidayRoutingModule
  ],
  exports: [TradingHolidayComponent]
})

export class TradingHolidayModule { }