import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from '../service/open-an-account/contact.service';
import { SnackbarService } from '../service/snackbar/snackbar.service';

@Component({
  selector: 'app-rise-ticket',
  templateUrl: './rise-ticket.component.html',
  styleUrls: ['./rise-ticket.component.scss'],
  
})
export class RiseTicketComponent implements OnInit {
  riseTicket = new FormGroup({
    email: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    uniqueid: new FormControl('', Validators.required),
    identities: new FormControl('', Validators.required),
    issue: new FormControl('', Validators.required),
    supportivedocs: new FormControl('',),
    fileupload: new FormControl(''),
  });

  identities = [
    { value: 'Alice Blue Client', viewValue: 'Alice Blue Client' },
    { value: 'Alice Blue Employee', viewValue: 'Alice Blue Employee' },
    { value: 'Alice Blue Authorized Partner', viewValue: 'Alice Blue Authorized Partner' },
    { value: 'Others', viewValue: 'Others' },
  ];

  file:File;
  
  constructor(private contactService : ContactService ,
    public dialog: MatDialog, 
    private snackbarService: SnackbarService) { }

  pickFiles(event){
    this.file = event.target.files[0];
  }

  issues = [
    { value: 'New Account Opening', viewValue: 'New Account Opening' },
    { value: 'Bank Account Modification', viewValue: 'Bank Account Modification' },
    { value: 'Add Funds', viewValue: 'Add Funds' },
    { value: 'Withdraw Funds', viewValue: 'Withdraw Funds' },
    { value: 'PayIn related', viewValue: 'PayIn related' },
    { value: 'Payout related', viewValue: 'Payout related' },
    { value: 'Placing a new order', viewValue: 'Placing a new order' },
    { value: 'Order getting rejected', viewValue: 'Order getting rejected' },
    { value: 'Position / Holdings related', viewValue: 'Position / Holdings related' },
    { value: 'Segment Activation', viewValue: 'Segment Activation' },
    { value: 'Intraday Margins', viewValue: 'Intraday Margins' },
    { value: 'Smart-Transfer', viewValue: 'Smart-Transfer' },
    { value: 'Unable to sell holdings', viewValue: 'Unable to sell holdings' },
    { value: 'Queries', viewValue: 'Queries' },
    { value: 'Others', viewValue: 'Others' },

  ];
  supportivedocs = [
    { value: 'Screenshot of the order rejection details (scrip name, order type, rejection msg)', viewValue: 'Screenshot of the order rejection details (scrip name, order type, rejection msg)' },
    { value: 'Screenshot of transaction details and error message for add/withdraw funds', viewValue: 'Screenshot of transaction details and error message for add/withdraw funds' },
    { value: 'Share your account number, IFSC code, Bank Name with attachment proof', viewValue: 'Share your account number, IFSC code, Bank Name with attachment proof' },
    { value: 'No Documents required', viewValue: 'No Documents required' },

  ];

  ngOnInit(): void {
  }

keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('client_type',this.riseTicket.value.identities)
    formData.append('contact_no',this.riseTicket.value.mobile)
    formData.append('email_id',this.riseTicket.value.email)
    formData.append('issue_type',this.riseTicket.value.issue)
    formData.append('supportive_documents',this.riseTicket.value.supportivedocs)
    formData.append('user_subject',this.riseTicket.value.subject)
    formData.append('file',this.file)
    this.contactService.riseTicket(formData)
   
      .subscribe((response) => {
        this.snackbarService.openSnackBar("mat-primary", response[0]);
        if(response[0] == "Ticket Generated") {
          setTimeout(() => {
            this.dialog.closeAll();
          }, 300);
        }
      }, (error) => {
        console.log(error)
        this.snackbarService.openSnackBar("mat-warn", error.error);
      })
  }
}