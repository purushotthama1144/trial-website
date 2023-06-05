import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerageCalculatorComponent } from './brokerage-calculator.component';
import { CommodityComponent } from './commodity/commodity.component';
import { CurrencyComponent } from './currency/currency.component';
import { EquityComponent } from './equity/equity.component';

const routes: Routes = [
    {
        path: '', component: BrokerageCalculatorComponent, data: { breadcrumb: 'Brokerage Calculator' },
        children: [
            { path: '', redirectTo: '/brokerage-calculator/equity', pathMatch: 'full' },
            { path: 'equity', component: EquityComponent, data: { breadcrumb: 'Equity' } },
            { path: 'commodities', component: CommodityComponent, data: { breadcrumb: 'Commodity' } },
            { path: 'currency', component: CurrencyComponent, data: { breadcrumb: 'Currency' } }
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BrokerageCalculatorRoutingModule { }