import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorBlogComponent } from './author-blog.component';

const routes: Routes = [
    { path: '', component: AuthorBlogComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorBlogRoutingModule { }