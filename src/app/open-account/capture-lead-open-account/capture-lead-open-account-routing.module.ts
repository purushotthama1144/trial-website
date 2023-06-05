import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaptureLeadOpenAccountComponent } from './capture-lead-open-account.component';

const routes: Routes = [
  { path: '', component: CaptureLeadOpenAccountComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaptureLeadOpenAccountRoutingModule { }