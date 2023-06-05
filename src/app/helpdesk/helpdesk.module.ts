import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpDeskRoutingModule } from './helpdesk-routing.module';
import { HelpdeskComponent } from './helpdesk.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HelpdeskComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HelpDeskRoutingModule
  ]
})
export class HelpDeskModule { }