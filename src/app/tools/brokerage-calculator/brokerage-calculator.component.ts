import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SeoService } from 'src/app/service/seo/seo.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-brokerage-calculator',
  templateUrl: './brokerage-calculator.component.html',
  styleUrls: ['./brokerage-calculator.component.scss'],
  
})
export class BrokerageCalculatorComponent implements OnInit {
  contractNote = {
    "warningText": "Every contract note requires to be stamped as per regulations of the respective State Government. The charges vary based on state of residence provided on correspondence address proof when opening an Account.",
    "warningText1": "Above calculator does not include stamp duty. Check below for state wise stamp duty. *Bracket Order charges are applicable Rs. 4 + Gst on every executed order."
  }
  navLinks: any[];
  activeLinkIndex = -1;
  pageloader:boolean = true

  clientCode: string = "";
  copyLink :string = "" 
  shareLink = `https://aliceblueonline.com/open-account-fill-kyc-request-call-back?c=undefined`

  facebook_text = `Would highly recommend checking out Alice Blues ANTMobi App for trading & investing. Open an account & get lifetime free equity delivery trades. A must-try is their unique Trade Store App which is just a bundle of surprises! Join using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`
  twitter_text = `Check out Alice Blues ANTMobi App for trading & investing. Open an account using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`
  telegram_text=`Hi, check out Alice Blue. I strongly recommend trying their platform for Investments. You can open an account and invest using their ANTMobi app. A must-try is their unique Trade Store App which is just a bundle of surprises! Join using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`
  linkedin_text =`Would highly recommend checking out Alice Blues ANTMobi App for trading & investing. Open an account & get lifetime free equity delivery trades. A must-try is their unique Trade Store App which is just a bundle of surprises! Join using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`
  whatsapp_text =`Hi, check out Alice Blue. I strongly recommend trying their platform for Investments. You can open an account and invest using their ANTMobi app. A must-try is their unique Trade Store App which is just a bundle of surprises! Join using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`
  
  constructor(private router: Router , private meta: Meta , private seoService: SeoService , private title: Title , private snackbarService: SnackbarService) {
    this.navLinks = [
      {
        label: 'Equities F&O',
        link: './equity',
        index: 0
      }, {
        label: 'Commodity',
        link: './commodities',
        index: 1
      }, {
        label: 'Currency',
        link: './currency',
        index: 2
      },
    ];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageloader = false
    }, 300);
    this.getSeoData()
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  generateLink() {
    if(this.clientCode){
      this.snackbarService.openSnackBar("mat-primary", "Generated link Successfully");
      this.copyLink = `https://aliceblueonline.com/open-account-fill-kyc-request-call-back?c=${this.clientCode}`;
      this.shareLink = this.copyLink
    }
    else{
      this.snackbarService.openSnackBar("mat-warn", "Please enter Client/Franchise code and then proceed");
    }
    
  }
  /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.snackbarService.openSnackBar("mat-primary", "Link Copied Successfully");
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
}
