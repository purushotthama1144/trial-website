import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircularDetailComponent } from './circular-detail/circular-detail.component';
import { CircularsComponent } from './circulars.component';


const routes: Routes = [
  { path: '', component: CircularsComponent, data: { breadcrumb: 'Circulars' } },
  { path: ':category/:url', component: CircularDetailComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CircularsRoutingModule { }