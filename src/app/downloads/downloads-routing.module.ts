import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AccountOpenComponent } from './account-open/account-open.component';
import { DownloadsComponent } from './downloads.component';
import { OtherComponent } from './other/other.component';
import { PolicyComponent } from './policy/policy.component';
import { SoftwaresComponent } from './softwares/softwares.component';
import { UserManualComponent } from './user-manual/user-manual.component';

const routes: Routes = [
  { path: '', component: DownloadsComponent, data: { breadcrumb: 'Downloads' } ,
    children: [
      { path: '', redirectTo: '/downloads/account-opening', pathMatch: 'full' },
      { path: 'account-opening', component: AccountOpenComponent },
      { path: 'user-manual', component:  UserManualComponent},
      { path: 'softwares', component: SoftwaresComponent },
      { path: 'policies', component:  PolicyComponent },
      { path: 'other', component:  OtherComponent },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadsRoutingModule { }