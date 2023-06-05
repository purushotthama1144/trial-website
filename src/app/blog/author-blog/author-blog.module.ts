import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorBlogRoutingModule } from './author-blog-routing-module';
import { AuthorBlogComponent } from './author-blog.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AuthorBlogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthorBlogRoutingModule
  ]
})
export class AuthorBlogModule { }