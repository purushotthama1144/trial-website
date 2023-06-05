import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigilinkClientComponent } from './digilink-client.component';

const routes: Routes = [
    { path: '', component: DigilinkClientComponent, data: { breadcrumb: '' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigilinkClientRoutingModule { }