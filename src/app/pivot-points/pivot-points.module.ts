import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PivotPointsRoutingModule } from './pivot-points-routing.module';
import { PivotPointsComponent } from './pivot-points.component';
import { SharedModule } from '../shared/shared.module';
import { McxPivotLevelComponent } from './mcx-pivot-level/mcx-pivot-level.component';
import { NsePivotLevelComponent } from './nse-pivot-level/nse-pivot-level.component';

@NgModule({
  declarations: [
    PivotPointsComponent,
    McxPivotLevelComponent,
    NsePivotLevelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PivotPointsRoutingModule
  ]
})
export class PivotPointsModule { }