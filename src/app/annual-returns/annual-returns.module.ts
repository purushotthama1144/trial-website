import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualReturnsRoutingModule } from './annual-returns-routing.module';
import { AnnualReturnsComponent } from './annual-returns.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AnnualReturnsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AnnualReturnsRoutingModule
  ]
})

export class AnnualReturnsModule { }