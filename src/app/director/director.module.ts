import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorRoutingModule } from './director-routing.module';
import { DirectorComponent } from './director.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DirectorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DirectorRoutingModule
  ]
})
export class DirectorModule { }