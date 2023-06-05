import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestorCharterComponent } from './investor-charter.component';

const routes: Routes = [
  { path: '', component:InvestorCharterComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorCharterRoutingModule { }