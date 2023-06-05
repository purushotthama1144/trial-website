import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferUsComponent } from './refer-us.component';

const routes: Routes = [
  { path: '', component: ReferUsComponent, data: { breadcrumb: 'Refer Us' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferUsRoutingModule { }