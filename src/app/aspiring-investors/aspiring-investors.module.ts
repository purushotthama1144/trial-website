import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AspiringInvestorsRoutingModule } from './aspiring-investors-routing.module';
import { AspiringInvestorsComponent } from './aspiring-investors.component';
import { SharedModule } from '../shared/shared.module';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@NgModule({
  declarations: [
    AspiringInvestorsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AspiringInvestorsRoutingModule
  ]
})

export class AspiringInvestorsModule { }