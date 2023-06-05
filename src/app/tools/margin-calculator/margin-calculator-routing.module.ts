import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommodityCalculatorComponent } from './commodity-calculator/commodity-calculator.component';
import { CurrencyfutureComponent } from './currencyfuture/currencyfuture.component';
import { EquityfutureCalculatorComponent } from './equityfuture-calculator/equityfuture-calculator.component';
import { EquityspotCalculatorComponent } from './equityspot-calculator/equityspot-calculator.component';
import { MarginCalculatorComponent } from './margin-calculator.component';
import { OptionComponent } from './option/option.component';

const routes: Routes = [
    {
        path: '', component: MarginCalculatorComponent,
        children: [
            { path: '', redirectTo: '/margin-calculator/equity', pathMatch: 'full' },
            // { path: 'commodity', component: CommodityCalculatorComponent },
            // { path: 'currency', component: CurrencyfutureComponent },
            // { path: 'futures', component: EquityfutureCalculatorComponent },
            { path: 'equity', component: EquityspotCalculatorComponent },
            // { path: 'nifty-and-bank-nifty', component: OptionComponent },
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MarginCalculatorRoutingModule { }