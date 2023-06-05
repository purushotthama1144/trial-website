import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './faq.component';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { QuestionListComponent } from './question-list/question-list.component';

const routes: Routes = [
  {
    // support
    path: '', component: FaqComponent, data: { breadcrumb: 'FAQ' },
    children: [
      { path: '', component: QuestionListComponent, data: { breadcrumb: 'Questions' } },
      // { path: ':user', component: QuestionListComponent, data: { breadcrumb: 'Questions' } },
      // { path: ':activeCategory', component: QuestionListComponent, data: { breadcrumb: 'Questions' } },
      // { path: ':activeCategory/:activeSubCategory/:', component: QuestionListComponent, data: { breadcrumb: 'Questions' } },
      { path: ':category/:subCategory', component: QuestionAnswerComponent, data: { breadcrumb: 'Questions' } },
      // { path: ':final_redirect_url', component: QuestionAnswerComponent, data: { breadcrumb: 'Question Answer' } },
      // { path: 'question-answer/:user/:activeCategory', component: QuestionAnswerComponent, data: { breadcrumb: 'Question Answer' } },
      // { path: 'question-answer/:user/:activeCategory/:activeSubCategory', component: QuestionAnswerComponent, data: { breadcrumb: 'Question Answer' } },
      // { path: 'question-answer/:user/:activeCategory/:activeSubCategory/:question', component: QuestionAnswerComponent, data: { breadcrumb: 'Question Answer' } },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule { }