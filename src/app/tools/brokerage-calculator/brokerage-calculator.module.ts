import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrokerageCalculatorRoutingModule } from './brokerage-calculator-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrokerageCalculatorComponent } from './brokerage-calculator.component';
import { BrokerageComponent } from './brokerage/brokerage.component';
import { CommodityComponent } from './commodity/commodity.component';
import { CurrencyComponent } from './currency/currency.component';
import { EquityComponent } from './equity/equity.component';
import { TrendingToolsComponent } from '../trending-tools/trending-tools.component';

@NgModule({
  declarations: [
    BrokerageCalculatorComponent,
    BrokerageComponent,
    CommodityComponent,
    CurrencyComponent,
    EquityComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrokerageCalculatorRoutingModule
  ]
})
export class BrokerageCalculatorModule { }