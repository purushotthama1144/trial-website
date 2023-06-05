import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadsRoutingModule } from './downloads-routing.module';
import { DownloadsComponent } from './downloads.component';
import { SharedModule } from '../shared/shared.module';
import { AccountOpenComponent } from './account-open/account-open.component';
import { UserManualComponent } from './user-manual/user-manual.component';
import { SoftwaresComponent } from './softwares/softwares.component';
import { PolicyComponent } from './policy/policy.component';
import { OtherComponent } from './other/other.component';

@NgModule({
  declarations: [
    DownloadsComponent,
    AccountOpenComponent,
    UserManualComponent,
    SoftwaresComponent,
    PolicyComponent,
    OtherComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DownloadsRoutingModule
  ]
})
export class DownloadsModule { }