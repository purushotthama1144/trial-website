import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AspiringInvestorsComponent } from './aspiring-investors.component';

const routes: Routes = [
  { path: '', component: AspiringInvestorsComponent, data: { breadcrumb: 'Careers' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AspiringInvestorsRoutingModule { }