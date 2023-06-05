import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AntMobiComponent } from './ant-mobi.component';

const routes: Routes = [
  { path: '', component: AntMobiComponent, data: { breadcrumb: 'ANT-Mobi' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntMobiRoutingModule { }