import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HowToRoutingModule } from './howto-routing.module';
import { HowtoComponent } from './howto.component';
import { SharedModule } from '../shared/shared.module';
import { HowToDetailComponent } from './how-to-detail/how-to-detail.component';
import { VideoModelComponent } from './video-model/video-model.component';

@NgModule({
  declarations: [
    HowtoComponent,
    HowToDetailComponent,
    VideoModelComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    HowToRoutingModule
  ]
})
export class HowToModule { }