import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntDeskRoutingModule } from './ant-desk-routing-module';
import { AntDeskComponent } from './ant-desk.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [
    AntDeskComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AntDeskRoutingModule
  ]
})
export class AntDeskModule { }