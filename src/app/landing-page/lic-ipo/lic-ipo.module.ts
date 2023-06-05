import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicIpoRoutingModule } from './lic-ipo-routing.module';
import { LicIpoComponent } from './lic-ipo.component';


@NgModule({
  declarations: [LicIpoComponent],
  imports: [
    CommonModule,
    LicIpoRoutingModule
  ]
})
export class LicIpoModule { }
