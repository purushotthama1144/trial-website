import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradelinkComponent } from './tradelink.component';

const routes: Routes = [
  { path: '', component: TradelinkComponent, data: { breadcrumb: 'Tradelink' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradelinkRoutingModule { }