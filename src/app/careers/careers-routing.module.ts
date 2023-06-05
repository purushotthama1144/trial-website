import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareerDetailComponent } from './career-detail/career-detail.component';
import { CareersComponent } from './careers.component';

const routes: Routes = [
  { path: '', component: CareersComponent, data: { breadcrumb: 'Careers' } },
  { path: 'job/:title',component: CareerDetailComponent, data: { breadcrumb: 'Career Details' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareersRoutingModule { }