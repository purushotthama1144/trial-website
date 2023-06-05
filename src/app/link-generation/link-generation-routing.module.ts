import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkGenerationComponent } from './link-generation.component';


const routes: Routes = [
  { path: '', component: LinkGenerationComponent , data: { breadcrumb: 'Open an Account' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkGenerationRoutingModule { }