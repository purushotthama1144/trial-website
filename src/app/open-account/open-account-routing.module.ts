import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenAccountComponent } from './open-account.component';

const routes: Routes = [
  { path: '', component: OpenAccountComponent, data: { breadcrumb: 'Open an Account' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenAccountRoutingModule { }