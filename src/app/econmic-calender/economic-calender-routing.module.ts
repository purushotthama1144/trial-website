import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EconmicCalenderComponent } from './econmic-calender.component';

const routes: Routes = [
    { path: '', component: EconmicCalenderComponent, data: { breadcrumb: 'Economic Calender' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EconomicCalenderRoutingModule { }