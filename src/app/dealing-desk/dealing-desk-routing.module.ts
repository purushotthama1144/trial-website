import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealingDeskComponent } from './dealing-desk.component';

const routes: Routes = [
  { path: '', component: DealingDeskComponent, data: { breadcrumb: 'Dealing Desk' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealingDeskRoutingModule { }