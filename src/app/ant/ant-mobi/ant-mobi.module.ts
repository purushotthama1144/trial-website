import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntMobiRoutingModule } from './ant-mobi-routing.module';
import { AntMobiComponent } from './ant-mobi.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AntMobiComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AntMobiRoutingModule
  ]
})
export class AntMobiModule { }