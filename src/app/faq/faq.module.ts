import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import { SharedModule } from '../shared/shared.module';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { FaqUserComponent } from './faq-user/faq-user.component';

@NgModule({
  declarations: [
    FaqComponent,
    QuestionAnswerComponent,
    QuestionListComponent,
    FaqUserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FaqRoutingModule
  ]
})
export class FaqModule { }