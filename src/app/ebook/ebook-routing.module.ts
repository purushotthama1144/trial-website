import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EbookDetailComponent } from './ebook-detail/ebook-detail.component';
import { EbookComponent } from './ebook.component';

const routes: Routes = [
  { path: '', component: EbookComponent, data: { breadcrumb: 'Ebook' } },
  { path: ':pageurl', component: EbookDetailComponent, data: { breadcrumb: 'Ebook' } }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EbookRoutingModule { }