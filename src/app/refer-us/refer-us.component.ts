import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PopupComponent } from '../home/popup/popup.component';
import { FaqService } from '../service/faq/faq.service';
import { PopupService } from '../service/popup/popup.service';
import { ReferService } from '../service/refer/refer.service';
import { SeoService } from '../service/seo/seo.service';
import { SnackbarService } from '../service/snackbar/snackbar.service';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

@Component({
  selector: 'app-refer-us',
  templateUrl: './refer-us.component.html',
  styleUrls: ['./refer-us.component.scss'],
  
})
export class ReferUsComponent implements OnInit {
  copyLink: string = ""
  clientCode: string = "";
  pageloader: boolean = true
  

  digilinkForm: FormGroup = new FormGroup({});
  arr: FormArray;
  displayCities = [];
  pages = [
    {
      "value": "open-account-fill-kyc-request-call-back",
      "name": "Open an Account"
    },
    {
      "value": "brokerage-calculator/equity",
      "name": "Brokerage calculator"
    },
    {
      "value": "margin-calculator/commodity",
      "name": "Margin Calculator"
    },
    {
      "value": "margin-calculator/nifty-and-bank-nifty",
      "name": "Option calculator"
    },
    // {
    //   "value": "",
    //   "name": "Market Talk"
    // },
    {
      "value": "antiq",
      "name": "AntIQ"
    },
    {
      "value": "how-to-videos",
      "name": "How To Videos"
    },
    {
      "value": "pricing",
      "name": "Pricing"
    },
  ]

  selectedPage: string = this.pages[0].value;
  shareLink = `https://aliceblueonline.com/${this.selectedPage}/?C=undefined`

  connections = [
    "Family member" , "Friend", "Colleague", "Acquaintance"
  ]
  faqs:any[] = [];
  config: boolean = false;
  safeSrc: SafeResourceUrl;

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
  popup: any;
  constructor(private referService: ReferService, 
    private sanitizer: DomSanitizer, 
    private snackbarService: SnackbarService, 
    private formbuilder: FormBuilder, private dialog: MatDialog,
    private faqservice : FaqService ,
    private router: Router , private meta: Meta , private seoService: SeoService , 
    private title: Title ,
    private popupservice : PopupService ) {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/gDNviNojZqE'
    );
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageloader = false
    }, 300);
    this.getSeoData()
    this.getfaq()
    this.getPopupData()
    this.displayCities = this.cities;
    this.digilinkForm = this.formbuilder.group({
      arr: this.formbuilder.array([this.createItem()])
    })
  }

  toggle(index: number) {
    if (!this.config) {
      this.faqs.filter((menu, i) => i !== index && menu.active).forEach((menu) => (menu.active = !menu.active));
    }
    this.faqs[index].active = !this.faqs[index].active;
  }

  get digiFormArr(): FormArray {
    return this.digilinkForm.get('arr') as FormArray;
  }

  getCitiesofstate(i) {
    this.displayCities = this.cities.filter((cityData) => cityData.state == this.digiFormArr.value[i].state)
  }

  addItem() {
    this.arr = this.digilinkForm.get('arr') as FormArray;
    if (this.arr.length < 3) {
      this.arr.push(this.createItem());
    }
  }

  createItem() {
    return this.formbuilder.group({
      clientCode: new FormControl('', Validators.required),
      refereeName: new FormControl('', Validators.required),
      refereeEmail: new FormControl('', Validators.required),
      refereeMobile: new FormControl('', Validators.required),
      connection: new FormControl('', Validators.required),
      // state: new FormControl('', Validators.required),
      // city: new FormControl(''),
    })
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit(i) {
    if (this.digilinkForm.invalid) {
      this.snackbarService.openSnackBar("mat-warn", "Please fill the details");
    }
    else {
      const payload = {
        "referal_client_code":this.digiFormArr.value[i].clientCode,
        "name":this.digiFormArr.value[i].refereeName,
        "email_id":this.digiFormArr.value[i].refereeEmail,
        "mobile_no":this.digiFormArr.value[i].refereeMobile,
        "state":'',
        "city":'',
        "connections":this.digiFormArr.value[i].connection,
      }
      
      this.referService.refer(payload).subscribe((response) => {
        this.snackbarService.openSnackBar("mat-primary", response[0]);
      }, (error) => {
        this.snackbarService.openSnackBar("mat-warn", "Oops an error Occurred");
      })
    }
  }

  termsCondition() {
    this.dialog.open(TermsConditionsComponent, {
      disableClose: true,
      width: '80%',
    });
  }

  generateLink() {
    if (this.clientCode) {
      this.snackbarService.openSnackBar("mat-primary", "Your DigiLink URL is Generated Successfully");
      this.copyLink = `https://aliceblueonline.com/${this.selectedPage}/?C=${this.clientCode}`;
      this.shareLink = this.copyLink
    }
    else {
      this.snackbarService.openSnackBar("mat-warn", "Please enter Client/Franchise code and then proceed");
    }
  }

 /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.snackbarService.openSnackBar("mat-primary", "Your DigiLink URL is Copied Successfully");
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
