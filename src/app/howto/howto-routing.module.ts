import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HowToDetailComponent } from './how-to-detail/how-to-detail.component';
import { HowtoComponent } from './howto.component';

const routes: Routes = [
  { path: '', component: HowtoComponent, data: { breadcrumb: 'How-To' } },
  { path: ':pageurl', component: HowToDetailComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HowToRoutingModule { }