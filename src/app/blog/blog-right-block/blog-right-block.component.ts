import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/service/open-an-account/contact.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import * as $ from 'jquery';
import { isPlatformBrowser } from '@angular/common';
declare var $: $

@Component({
  selector: 'app-blog-right-block',
  templateUrl: './blog-right-block.component.html',
  styleUrls: ['./blog-right-block.component.scss'],
  
})
export class BlogRightBlockComponent implements OnInit {

  scrolled: boolean = false;
  formSubmitted: boolean = false;
  
  blogForm = new FormGroup({
    firstName: new FormControl('' , Validators.required),
    email: new FormControl('' , Validators.required),
    Mobile: new FormControl('' , Validators.required),
    State: new FormControl('' , Validators.required),
    City: new FormControl('' ),
  });

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ]

  cities = [
    { state: 'Tamil Nadu', city: 'Chennai' },
    { state: 'Tamil Nadu', city: 'Coimbatore' },
    { state: 'Tamil Nadu', city: 'Erode' },
    { state: 'Tamil Nadu', city: 'Karur' },
    { state: 'Tamil Nadu', city: 'Madurai' },
    { state: 'Maharashtra', city: 'Mumbai' },
    { state: 'Maharashtra', city: 'Pune' },
    { state: 'Maharashtra', city: 'Nagpur' },
  ]

  displayCities = [];

  constructor(private snackbarService: SnackbarService ,
    @Inject(PLATFORM_ID) private platformId: any, 
    private contactService: ContactService) { }
  
  getCitiesofstate() {
    this.displayCities = this.cities.filter((cityData) => cityData.state == this.blogForm.value.State)
  }
  
  ngOnInit(): void {

  }

  onSubmit(){
    this.formSubmitted = true
    if (isPlatformBrowser(this.platformId)) {
    const payload = {
      "url": window.location.toString(),
      "name": this.blogForm.value.firstName,
      "email": this.blogForm.value.email,
      "mobile": this.blogForm.value.Mobile,
      "state": this.blogForm.value.State,
      "city": this.blogForm.value.City
    }
    this.contactService.createClientAccount(payload)
      .subscribe((response) => {
        this.formSubmitted = false
        if (response.redirect_url) {
          window.open(response.redirect_url,"_self")
        }
        else{
          this.snackbarService.openSnackBar("mat-warn", response[0]);
        }
      }, (error) => {

      })
    }
  }

  @HostListener("window: scroll", [])

  onWindowScroll() { 
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled = window.scrollY > 520;
    }
  }

}
