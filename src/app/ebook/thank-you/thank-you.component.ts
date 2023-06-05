import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog/blog.service';
import { EbookService } from 'src/app/service/ebook/ebook.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
  
})
export class ThankYouComponent implements OnInit {
  formSubmitted: boolean = false
  callbackForm = new FormGroup({
    firstName: new FormControl('' , Validators.required),
    email: new FormControl('' , Validators.required),
    Mobile: new FormControl('' , Validators.required),
    State: new FormControl('' , Validators.required),
  });

  states = [
    {value: 'Andhra Pradesh', viewValue: 'Andhra Pradesh'},
    {value: 'Arunachal Pradesh', viewValue: 'Arunachal Pradesh'},
    {value: 'Assam', viewValue: 'Assam'},
    {value: 'Bihar', viewValue: 'Bihar'},
    {value: 'Chandigarh', viewValue: 'Chandigarh'},
    {value: 'Delhi', viewValue: 'Delhi'},
    {value: 'Goa', viewValue: 'Goa'},
    {value: 'Gujarat', viewValue: 'Gujarat'},
    {value: 'Haryana', viewValue: 'Haryana'},
    {value: 'Himachal Pradesh', viewValue: 'Himachal Pradesh'},
    {value: 'Jammu and Kashmir', viewValue: 'Jammu and Kashmir'},
    {value: 'Jharkhand', viewValue: 'Jharkhand'},
    {value: 'Karnataka', viewValue: 'Karnataka'},
    {value: 'Kerala', viewValue: 'Kerala'},
    {value: 'Madhya Pradesh', viewValue: 'Madhya Pradesh'},
    {value: 'Maharashtra', viewValue: 'Maharashtra'},
    {value: 'Manipur', viewValue: 'Manipur'},
    {value: 'Meghalaya', viewValue: 'Meghalaya'},
    {value: 'Mizoram', viewValue: 'Mizoram'},
    {value: 'Nagaland', viewValue: 'Nagaland'},
    {value: 'Orissa', viewValue: 'Orissa'},
    {value: 'Punjab', viewValue: 'Punjab'},
    {value: 'Rajasthan', viewValue: 'Rajasthan'},
    {value: 'Sikkim', viewValue: 'Sikkim'},
    {value: 'Tamil Nadu', viewValue: 'Tamil Nadu'},
    {value: 'Telangana', viewValue: 'Telangana'},
    {value: 'Tripura', viewValue: 'Tripura'},
    {value: 'Uttarakhand', viewValue: 'Uttarakhand'},
    {value: 'West Bengal', viewValue: 'West Bengal'},
  ];

  blogData : any[] = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private ebookService : EbookService , private snackbarService : SnackbarService) { }

  ngOnInit(): void {

  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit(){
    this.formSubmitted = true;
    const payload = {
      "user_name": this.callbackForm.value.firstName,
      "email_id": this.callbackForm.value.email,
      "contact_no": this.callbackForm.value.Mobile,
      "user_state": this.callbackForm.value.State,
    }
    this.ebookService.fetchCallbackFormData(payload).subscribe((response) => {
      this.snackbarService.openSnackBar("mat-primary", response[0]);
    } , (error) => {
      console.log(error)
      this.snackbarService.openSnackBar("mat-warn", error.error);
      this.formSubmitted = false;
    })
  }

}
