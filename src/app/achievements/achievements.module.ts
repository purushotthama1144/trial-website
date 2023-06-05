import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AchievementsRoutingModule } from './achievements-routing.module';
import { AchievementsComponent } from './achievements.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AchievementsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AchievementsRoutingModule
  ]
})
export class AchievementsModule { }