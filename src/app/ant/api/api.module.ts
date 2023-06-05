import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from './api.component';

const routes: Routes = [
    { path: '', component: ApiComponent, data: { breadcrumb: 'ANT-Desk' } }
];

@NgModule({
  declarations: [
    ApiComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ApiModule { }