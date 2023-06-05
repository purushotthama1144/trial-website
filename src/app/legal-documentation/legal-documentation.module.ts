import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalDocumentationRoutingModule } from './legal-documentation-routing.module';
import { LegalDocumentationComponent } from './legal-documentation.component';
import { SharedModule } from '../shared/shared.module';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';

@NgModule({
  declarations: [
    LegalDocumentationComponent,
    TermConditionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LegalDocumentationRoutingModule
  ]
})
export class LegalDocumentationModule { }