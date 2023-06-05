import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AntPlusRoutingModule } from './ant-plus-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AntPlusPageComponent } from './ant-plus-page.component';

@NgModule({
  declarations: [
    AntPlusPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AntPlusRoutingModule,
  ]
})
export class AntPlusModule { }