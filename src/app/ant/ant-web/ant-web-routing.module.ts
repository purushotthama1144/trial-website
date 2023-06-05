import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AntWebComponent } from './ant-web.component';

const routes: Routes = [
  { path: '', component: AntWebComponent, data: { breadcrumb: 'ANT-Web' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntWebRoutingModule { }