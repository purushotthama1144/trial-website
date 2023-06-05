import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbCaresRoutingModule } from './ab-cares-routing.module';
import { AbCaresComponent } from './ab-cares.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AbCaresComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AbCaresRoutingModule
  ]
})

export class AbCaresModule { }