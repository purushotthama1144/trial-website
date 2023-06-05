import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EbookRoutingModule } from './ebook-routing.module';
import { EbookComponent } from './ebook.component';
import { SharedModule } from '../shared/shared.module';
import { EbookDetailComponent } from './ebook-detail/ebook-detail.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

@NgModule({
  declarations: [
    EbookComponent,
    EbookDetailComponent,
    ThankYouComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EbookRoutingModule
  ]
})
export class EbookModule { }
