import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegalDocumentationComponent } from './legal-documentation.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';

const routes: Routes = [
  { path: '', component: LegalDocumentationComponent },
  { path: ':doc', component: TermConditionsComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalDocumentationRoutingModule { }