import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenAccountRoutingModule } from './open-account-routing.module';
import { OpenAccountComponent } from './open-account.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    OpenAccountComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OpenAccountRoutingModule
  ]
})
export class OpenAccountModule { }