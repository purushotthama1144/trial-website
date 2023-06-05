import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostBoxComponent } from './post-box.component';

const routes: Routes = [
  { path: '', component: PostBoxComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostBoxRoutingModule { }