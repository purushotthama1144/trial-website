import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigilinkPartnerComponent } from './digilink-partner.component';

const routes: Routes = [
  { path: '', component: DigilinkPartnerComponent, data: { breadcrumb: '' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigilinkPartnerRoutingModule { }