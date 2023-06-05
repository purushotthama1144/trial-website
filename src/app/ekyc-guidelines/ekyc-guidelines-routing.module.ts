import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EkycGuidelinesComponent } from './ekyc-guidelines.component';

const routes: Routes = [
  { path: '', component: EkycGuidelinesComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EkycGuidelinesRoutingModule { }