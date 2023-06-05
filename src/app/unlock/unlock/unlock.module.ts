import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnlockRoutingModule } from './unlock-routing.module';
import { UnlockComponent } from './unlock.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuizComponent } from './quiz/quiz.component';
import { RewardsComponent } from '../rewards/rewards.component';


@NgModule({
  declarations: [
    UnlockComponent,
    QuizComponent,
    RewardsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UnlockRoutingModule
  ]
})
export class UnlockModule { }