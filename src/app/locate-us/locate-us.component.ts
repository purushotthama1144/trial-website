import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FaqService } from '../service/faq/faq.service';
import { ContactService } from '../service/open-an-account/contact.service';
import { SnackbarService } from '../service/snackbar/snackbar.service';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { LocationService } from '../service/location/location.service';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../service/seo/seo.service';
import { PopupService } from '../service/popup/popup.service';
import { PopupComponent } from '../home/popup/popup.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-locate-us',
  templateUrl: './locate-us.component.html',
  styleUrls: ['./locate-us.component.scss'], 
  
})

export class LocateUsComponent implements OnInit {
  locationData : any = {};

  formSubmitted: boolean = false;
  pageloader: boolean = false;
  // google maps zoom level
  zoom: number = 5;
  
  activeBranchDetail: any;
  activeMarkerDetail: any;

  // initial center position for the map
  lat: number = 15.3173;
  lng: number = 75.7139;
  activeMarker: any = "";
  branch: string = "";
  branch_contact_number_one = "";
  branch_contact_name_one = "";
  branch_contact_number_two = "";
  branch_contact_name_two = "";
  
  clickedMarker(label: string) {
    this.activeMarker = `${label}`;
    this.activeBranchDetail = this.branches.find(branch=> branch.branch == this.activeMarker );
  }

  objectKeys = Object.keys;
 
  branches: any[] = []

  faqs:any[] = [];
  config: boolean = false;

  accountopenForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    emailId: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    Mobile: new FormControl('', Validators.required),
    State: new FormControl('', Validators.required),
    City: new FormControl(''),
    check: new FormControl('ckecked', Validators.required)
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
  popup:any;

  constructor(private dialog: MatDialog ,private locationService: LocationService , private activatedRoute: ActivatedRoute , private faqservice: FaqService , private snackbarService: SnackbarService,
    private contactService: ContactService , 
    @Inject(PLATFORM_ID) private platformId: any,private router : Router , private meta: Meta , private seoService: SeoService , private title: Title ,
    private popupservice: PopupService) { }

  ngOnInit(): void {
    this.getSeoData()
    this.getLocationdata()
    this.getfaq()
    this.getPopupData()
    this.activatedRoute.params.subscribe(
      params => {
        // url passing small case
        this.activeMarker = params['branch'].charAt(0).toUpperCase() + params['branch'].slice(1);
        if(this.activeMarker){
          this.activeBranchDetail = this.branches.find(branch=> branch.branch == this.activeMarker );
        }
      }
    )
  }

  toggle(index: number) {
    if (!this.config) {
      this.faqs.filter((menu, i) => i !== index && menu.active).forEach((menu) => (menu.active = !menu.active));
    }
    this.faqs[index].active = !this.faqs[index].active;
  }
 
  openDialog() {
    this.dialog.open(LocationDialogComponent , { disableClose: true });
  }

  getfaq(){
    const data = {
      "page_url": this.router.url
    }
    this.faqservice.fetchsinglePagefaq(data).subscribe((response: any) => {
      this.faqs = response[0] == 'No Data'?[]:response;
    } ,  (error) => {
      console.log(error)
    })
  }

  getCitiesofstate() {
    this.displayCities = this.cities.filter((cityData) => cityData.state == this.accountopenForm.value.State)
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
        "name": this.accountopenForm.value.firstName,
        "email": this.accountopenForm.value.emailId,
        "mobile": this.accountopenForm.value.Mobile,
        "state": this.accountopenForm.value.State,
        "city": this.accountopenForm.value.City
      }
      this.contactService.createClientAccount(payload).subscribe((response) => {
          this.formSubmitted = false
          if (response.redirect_url) {
            window.open(response.redirect_url,"_self")
          }
          else{
            this.snackbarService.openSnackBar("mat-warn", response[0]);
          }
      
        }, (error) => {
          console.log(error)
          this.snackbarService.openSnackBar("mat-warn", error.error);
          this.formSubmitted = false
        })
      }
  }

  getLocationdata() {
    this.pageloader = true
    const data = {
      "page_url":`https://aliceblueonline.com${this.router.url}`
    }
    this.locationService.fetchLocationData(data).subscribe((response) => {
      this.locationData = response;
      setTimeout(() => {
        this.pageloader = false
      }, 300);
      if(response.contact_one.includes("@")){
        this.branch_contact_name_one = response.contact_one.split('@')[0]
        this.branch_contact_number_one = response.contact_one.split('@')[1]
      }
      if(response.contact_two.includes("@")){
        this.branch_contact_name_two = response.contact_two.split('@')[0]
        this.branch_contact_number_two = response.contact_two.split('@')[1]
      }
      this.lat = +this.locationData.branch_latitude;
      this.lng = +this.locationData.branch_longitude;
    } , (error) => {

    })
  }

  getSeoData() {
    const data = {
      "page_url": `https://aliceblueonline.com${this.router.url}` 
    }
    this.seoService.createCanonicalURL();
    this.seoService.fetchSeoData(data).subscribe((response) => {
      
    this.meta.addTags([
      // { name: 'title' , content : response.meta_title ? response.meta_title : '' },
      { property: 'og:title' , content : response.og_title ? response.og_title : '' },
      { name: 'description' , content : response.meta_desc ? response.meta_desc : '' },
      { property: 'og:description', content: response.og_desc ? response.og_desc : '' },
      { property: 'og:image', content: response.og_image ? response.og_image : '' },
      { property: 'og:image:height', content: response.og_image_height ? response.og_image_height : '' },
      { property: 'og:image:width', content: response.og_image_width ? response.og_image_width : '' },
      { property: 'og:site_name', content: response.og_site ? response.og_site : '' },
      { property: 'og:type', content: response.og_type ? response.og_type : '' },
      { property: 'og:url', content: response.og_url ? response.og_url : '' },
      { name: 'twitter:title', content: response.twitter_title ? response.twitter_title : '' },
      { name: 'twitter:card', content: response.twitter_type ? response.twitter_type : '' },
      { name: 'twitter:site', content: response.twitter_site ? response.twitter_site : '' },
      { name: 'twitter:description', content: response.twitter_description ? response.twitter_description : '' },
      { name: 'twitter:image', content: response.twitter_image ? response.twitter_image : '' },
      { name: 'twitter:creator', content: response.twitter_handle ? response.twitter_handle : '' },
      { name: 'twitter:url', content: response.twitter_url ? response.twitter_url : '' },
    ]);
    this.title.setTitle(response.title);
    } , (error) => {
      console.log(error)
    })
  }

  getPopupData() {
    const data =  {
      "page_url":this.router.url == '/'?'/':this.router.url
    }
    this.popupservice.fetchpopupData(data).subscribe((response) => {
      this.popup = response[0] == 'No Data'?null:response;
      if(this.popup != null){
        this.dialog.open(PopupComponent, {
          data : {
            data : this.popup
          },
          disableClose: true,
          width: '30%',
panelClass: 'custom-modalbox',
          position: {
            bottom: '0px',
            left:'0px'
          }
        });
        setTimeout(()=>{
          this.dialog.closeAll()
        },5000)
      } else {
      
      }
    } , (error) => {
      console.log(error)
    })
  }
  
}
