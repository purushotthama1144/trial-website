import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnualReturnsComponent } from './annual-returns.component';

const routes: Routes = [
  { path: '', component:AnnualReturnsComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnualReturnsRoutingModule { }