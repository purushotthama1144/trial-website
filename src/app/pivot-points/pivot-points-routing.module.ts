import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PivotPointsComponent } from './pivot-points.component';

const routes: Routes = [
  { path: '', component: PivotPointsComponent, data: { breadcrumb: 'Pivot Points' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PivotPointsRoutingModule { }