import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackRoutingModule } from './feedack-routing.module';
import { FeedbackComponent } from './feedback.component';
import { SharedModule } from '../shared/shared.module';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';


@NgModule({
  declarations: [
    FeedbackComponent,
    FeedbackFormComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    FeedbackRoutingModule
  ]
})
export class FeedbackModule { }
