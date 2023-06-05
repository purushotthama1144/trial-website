import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicIpoComponent } from './lic-ipo.component';

const routes: Routes = [{ path: '', component: LicIpoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicIpoRoutingModule { }
