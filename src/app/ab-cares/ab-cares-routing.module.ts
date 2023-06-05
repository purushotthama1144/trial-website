import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbCaresComponent } from './ab-cares.component';

const routes: Routes = [
  { path: '', component:AbCaresComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbCaresRoutingModule { }