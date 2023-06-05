import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AntDeskComponent } from './ant-desk.component';

const routes: Routes = [
  { path: '', component: AntDeskComponent, data: { breadcrumb: 'ANT-Desk' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntDeskRoutingModule { }