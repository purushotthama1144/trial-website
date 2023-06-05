import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { RiseTicketMailComponent } from './rise-ticket-mail/rise-ticket-mail.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RiseTicketMailComponent,
    EmailVerificationComponent,
    EmailVerifiedComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EmailModule { }
