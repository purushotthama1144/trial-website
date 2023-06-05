import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppStoreComponent } from './app-store.component';

const routes: Routes = [
  { path: '', component: AppStoreComponent, data: { breadcrumb: 'Careers' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppStoreRoutingModule { }