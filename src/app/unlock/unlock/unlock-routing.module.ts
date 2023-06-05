import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RewardsComponent } from '../rewards/rewards.component';
import { QuizComponent } from './quiz/quiz.component';
import { UnlockComponent } from './unlock.component';

const routes: Routes = [
    { path: '', component: UnlockComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'user-dashboard', component: RewardsComponent },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnlockRoutingModule { }