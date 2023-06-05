import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostBoxComponent } from './post-box.component';
import { PostBoxRoutingModule } from './post-box-routing.module';

@NgModule({
  declarations: [
    PostBoxComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostBoxRoutingModule
  ],
  exports: [PostBoxComponent]
})

export class PostBoxModule { }