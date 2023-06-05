import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DigipromoComponent } from './digipromo.component';


const routes: Routes = [
  { path: '', component: DigipromoComponent, data: { breadcrumb: 'Digipromo' }},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigipromoRoutingModule { }