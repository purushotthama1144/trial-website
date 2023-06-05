import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarginCalculatorRoutingModule } from './margin-calculator-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccordionComponent } from './accordion/accordion.component';
import { CalculationModalComponent } from './calculation-modal/calculation-modal.component';
import { CommodityCalculatorComponent } from './commodity-calculator/commodity-calculator.component';
import { CurrencyfutureComponent } from './currencyfuture/currencyfuture.component';
import { EquityfutureCalculatorComponent } from './equityfuture-calculator/equityfuture-calculator.component';
import { EquityspotCalculatorComponent } from './equityspot-calculator/equityspot-calculator.component';
import { OptionComponent } from './option/option.component';
import { MarginCalculatorComponent } from './margin-calculator.component';
import { StartTradingComponent } from '../start-trading/start-trading.component';

@NgModule({
  declarations: [
    MarginCalculatorComponent,
    AccordionComponent,
    CalculationModalComponent,
    CommodityCalculatorComponent,
    CurrencyfutureComponent,
    EquityfutureCalculatorComponent,
    EquityspotCalculatorComponent,
    OptionComponent,
    StartTradingComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    MarginCalculatorRoutingModule
  ]
})
export class MarginCalculatorModule { }