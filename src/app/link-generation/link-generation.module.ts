import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkGenerationRoutingModule } from './link-generation-routing.module';
import { LinkGenerationComponent } from './link-generation.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LinkGenerationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LinkGenerationRoutingModule
  ]
})
export class LinkGenerationModule { }