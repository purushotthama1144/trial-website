import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PopupComponent } from '../home/popup/popup.component';
import { FaqService } from '../service/faq/faq.service';
import { ContactService } from '../service/open-an-account/contact.service';
import { PopupService } from '../service/popup/popup.service';
import { SeoService } from '../service/seo/seo.service';
import { SnackbarService } from '../service/snackbar/snackbar.service';

@Component({
  selector: 'app-aspiring-investors',
  templateUrl: './aspiring-investors.component.html',
  styleUrls: ['./aspiring-investors.component.scss'],
  
})
export class AspiringInvestorsComponent implements OnInit {
  popup: any;
  formSubmitted: boolean = false;
  pageloader:boolean = true

  aspiringInvestorForm = new FormGroup({
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

  aspiring_investors = {
    banner_data: {
      banner_image: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/aspiring-investors/Header1.svg",
      banner_title: "ALICE BLUE ASPIRING INVESTOR PROGRAM",
      banner_sub_title: "Are you someone who’s pumped up to begin investing in Stock Markets? And have no clue where to start?",
      banner_spacial_text: "Alice Blue’s Aspiring Investor Program Is Built Just For You!",
      banner_link: "/open-account-fill-kyc-request-call-back",
      alt_text: ""
    },
    
    para_one: {
      para_title: "HOW ASPIRING INVESTOR PROGRAM WILL HELP YOU?",
      para_image: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/aspiring-investors/Image2.svg",
      para_list: `Courses from Industry Experts to make you Investment Ready`,
      alt_text: "stock market investing cources for biginners"
    },
    para_two :{
      para_image: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/aspiring-investors/Image3.svg",
      para_list:`Exclusive Support Team to assist you at all stages of your Investment Journey`,
      alt_text: "stock market investing help"
    },
    para_three :{
      para_image: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/aspiring-investors/Image4.svg",
      para_list:`Top Notch Investing & Trading Apps that will put an end to your second thoughts`,
      alt_text: "Investing apps "
    },
    para_four: {
      para_title: "GOT A BEGINNER FRIEND JUST LIKE YOU?",
      para_image: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/aspiring-investors/Image5.svg",
      para_content: `Help him/her discover the Aspiring Investor Program and GET ₹ 500 + 10% CASHBACK on your BROKERAGE for 30 DAYS.
                    <br><br>
                    Refer 2 friends and GET ₹ 1000 + 10% BROKERAGE CASHBACK for 30 DAYS, Refer 3 and GET ₹ 1500 and so on!`,
      alt_text: "Aspiring Investor referral Program",
    },
    para_five: {
      para_title: "HUMAN BEINGS ALWAYS WANT MORE, ALICE BLUE, ALWAYS OFFERS MORE!",
      para_image: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/aspiring-investors/Image6.svg",
      para_content: `Refer a friend successfully and GET 10% OF THE BROKERAGE YOUR FRIEND PAYS, LIFELONG!
                    <br><br>
                    THATS NOT ALL, YOUR FRIEND WILL ALSO GET 10% CASHBACK ON BROKERAGE FOR 30 DAYS!`,
      para_link:'/refer-us',
      alt_text: "refer & earn aspiring investor"

    },    
    para_six: {
      para_title: "WHY OPEN AN ACCOUNT WITH ALICE BLUE?",
      para_image: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/aspiring-investors/Image7.webp",
      para_content: `<ul>
                        <li>Lowest Brokerage - Flat ₹15/order</li>
                        <li>High End Trading Platform</li>
                        <li>Lifetime Free Equity Delivery</li>
                        <li>Invest in Mutual Funds & IPOs for Free</li>
                        <li>Algo Trading Facility</li>
                        <li>Pan India Multi-lingual Branch Support</li>
                        <li>Optimal Leverage, MTF & Cover Order</li>
                        <li>Trade in Any Segment with Single Margin</li>
                        <li>Pledge Shares without POA</li>
                        <li>Exclusive Access to Trade School & Trade Store</li>
                        <li>Timely Payin & Payout</li>
                        <li>Free Advanced API</li>
                      </ul>`,
      alt_text: "best trading account for new investors"

    },
    para_seven: {
      para_title: "DON’T THINK! OPEN YOUR ACCOUNT NOW & GRAB THIS AMAZING OPPORTUNITY!",
      para_image: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/aspiring-investors/Image8.webp",
      alt_text: "open an account"
    },
  }

  clientCode: string = "";
  copyLink :string = "" 
  shareLink = `https://leads.aliceblueonline.com/aspiring-investor-program/?C=undefined`

  constructor(private snackbarService: SnackbarService,
    private contactService: ContactService ,
    private faqservice : FaqService , 
    private router: Router , private meta: Meta , 
    private seoService: SeoService , private title: Title , private popupservice: PopupService , 
    private dialog : MatDialog , 
    @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageloader = false
    }, 300);
    this.getSeoData()
    this.getPopupData()
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
  getCitiesofstate() {
    this.displayCities = this.cities.filter((cityData) => cityData.state == this.aspiringInvestorForm.value.State)
  }

  onSubmit() {
    if (isPlatformBrowser(this.platformId)) {
    this.formSubmitted = true;
    const payload = {
      "url": window.location.toString(),
      "name": this.aspiringInvestorForm.value.firstName,
      "email": this.aspiringInvestorForm.value.emailId,
      "mobile": this.aspiringInvestorForm.value.Mobile,
      "state": this.aspiringInvestorForm.value.State,
      "city": this.aspiringInvestorForm.value.City
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
        console.log(error)
        this.snackbarService.openSnackBar("mat-warn", error.error);
        this.formSubmitted = false
      })
    }
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
  
  generateLink() {
    if(this.clientCode){
      this.snackbarService.openSnackBar("mat-primary", "Generated link Successfully");
      this.copyLink = `https://leads.aliceblueonline.com/aspiring-investor-program/?C=${this.clientCode}`;
      this.shareLink = this.copyLink
    }
    else{
      this.snackbarService.openSnackBar("mat-warn", "Please enter Client/Franchise code and then proceed");
    }
    
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

  /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.snackbarService.openSnackBar("mat-primary", "Link Copied Successfully");
  }
}
