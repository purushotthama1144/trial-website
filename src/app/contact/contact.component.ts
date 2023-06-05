import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ContactService } from '../service/open-an-account/contact.service';
import { SnackbarService } from '../service/snackbar/snackbar.service';
import * as $ from 'jquery';
import { isPlatformBrowser } from '@angular/common';
declare var $: $

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  
})
export class ContactComponent implements OnInit {
  popupIcon: any = {}
  
  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    emailId: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    Mobile: new FormControl('', Validators.required),
    State: new FormControl('', Validators.required),
    City: new FormControl('' ),

  });

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
  scrolled: boolean = false;


  constructor(@Inject(PLATFORM_ID) private platformId: any, 
    private snackbarService: SnackbarService,
    private contactService: ContactService) { }

  shown: boolean = false;
  formSubmitted: boolean = false;

  ngOnInit(): void {
    this.displayCities = this.cities;
  }
  getCitiesofstate() {
    this.displayCities = this.cities.filter((cityData) => cityData.state == this.contactForm.value.State)
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    if (isPlatformBrowser(this.platformId)) {
    this.formSubmitted = true;
    const payload = {
      "url": window.location.toString(),
      "name": this.contactForm.value.firstName,
      "email": this.contactForm.value.emailId,
      "mobile": this.contactForm.value.Mobile,
      "state": this.contactForm.value.State,
      "city": this.contactForm.value.City
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
        this.snackbarService.openSnackBar("mat-warn", error.error);
        this.formSubmitted = false
      })
    }
  }
  
  getContactImage() {
    this.contactService.fetchContactImage().subscribe((response) => {
      this.popupIcon = response
    })
  }
  toggleClass() {
    this.shown = !this.shown;
    this.getContactImage();

  }

  @HostListener("window: scroll", [])
  onWindowScroll() { 
    if (isPlatformBrowser(this.platformId)) { 
      this.scrolled = window.scrollY > 150;
    }
  }
}
