import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntWebRoutingModule } from './ant-web-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AntWebComponent } from './ant-web.component';

@NgModule({
  declarations: [
    AntWebComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AntWebRoutingModule
  ]
})
export class AntWebModule { }