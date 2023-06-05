import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircularsRoutingModule } from './circulars-routing.module';
import { CircularsComponent } from './circulars.component';
import { SharedModule } from '../shared/shared.module';
import { PostBoxComponent } from './post-box/post-box.component';
import { ForPartnerComponent } from './for-partner/for-partner.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { TradingHolidayModule } from './trading-holiday/trading-holiday.module';
import { CircularDetailComponent } from './circular-detail/circular-detail.component';
import { CircularTCComponent } from './circular-detail/t-c/t-c.component';

@NgModule({
  declarations: [
    CircularsComponent,
    PostBoxComponent,
    ForPartnerComponent,
    ExchangeComponent,
    CircularDetailComponent,
    CircularTCComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CircularsRoutingModule,
    TradingHolidayModule,
  ]
})

export class CircularsModule { }