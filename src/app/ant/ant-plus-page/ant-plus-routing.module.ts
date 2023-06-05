import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AntPlusPageComponent } from './ant-plus-page.component';

const routes: Routes = [
  { path: '', component: AntPlusPageComponent, data: { breadcrumb: 'ANT-Plus' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntPlusRoutingModule { }