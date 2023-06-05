  
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { OperationsTeamComponent } from './operations-team/operations-team.component';
import { SalesTeamComponent } from './sales-team/sales-team.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AboutUsComponent,
    OperationsTeamComponent,
    SalesTeamComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    SharedModule,
    AboutUsRoutingModule,
  ]
})
export class AboutUsModule { }