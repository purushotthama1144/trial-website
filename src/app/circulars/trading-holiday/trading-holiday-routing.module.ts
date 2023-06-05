import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradingHolidayComponent } from './trading-holiday.component';



const routes: Routes = [
  { path: '', component: TradingHolidayComponent, data: { breadcrumb: 'Trading Holiday' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingHolidayRoutingModule { }