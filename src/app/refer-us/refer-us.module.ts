import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferUsRoutingModule } from './refer-us-routing.module';
import { ReferUsComponent } from './refer-us.component';
import { SharedModule } from '../shared/shared.module';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

@NgModule({
  declarations: [
    ReferUsComponent,
    TermsConditionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReferUsRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ReferUsModule { }