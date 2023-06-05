import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PotentialCalculatorComponent } from './potential-calculator/potential-calculator.component';

import { SnackbarService } from '../service/snackbar/snackbar.service';
import { PartnerService } from '../service/open-an-account/partner.service';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { FaqService } from '../service/faq/faq.service';
import * as $ from 'jquery';
import { TCComponent } from '../digilink/t-c/t-c.component';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../service/seo/seo.service';
import { Router } from '@angular/router';
import { PopupComponent } from '../home/popup/popup.component';
import { PopupService } from '../service/popup/popup.service';
declare var $: $

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss'],
  
})
export class PartnerComponent implements OnInit {
  isDragging = true;
  formSubmitted: boolean = false;
  pageloader: boolean = true;

  partners = [
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Partner/Icons/authorized-partner.png",
      alt: "Alice Blue Authorized Partner",
      title: "Alice Blue’s Authorized Partner",
      description: "If wish to start & grow your stock market trading business, Authorized partnership is the right option for you.",
    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Partner/Icons/tradestore-product-partnership.png",
      alt: "Trade Store Product Partnership",
      title: "Trade Store Product Partnership",
      description: "If you own a software product, you can list your app on Trade Store and benefit from higher product visibility, sales & commission.",
    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Partner/Icons/tradeschool-tutor.png",
      alt: "Trade School Tutor",
      title: "Trade School Tutor",
      description: "If teaching is your passion, monetize your passion by uploading your courses on Trade School at zero platform usage cost.",
    },
    {
      image: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Partner/partnership-with-aliceblue.png",
      alt: "Alice Blue Business Partnership",
    }

  ]

  partnerData = [
    {
      header: "Trading Revenue Sharing",
      content: "Standard Revenue Sharing Per Eligibility Criteria",
      
    },
    {
      header: "Clients Traded Incentive",
      content: "For 6-24 clients, earn Rs.200 per Derivative Traded Account , for 25-49  clients earn Rs.300 per Derivative Traded Account &  for 50+ clients earn Rs.600 per Derivative Traded Account",
    },
    {
      header: "Mutual Funds Revenue Sharing",
      content: "Earn Rs. 10 per trade from Mutual Fund transactions",
    },
    {
      header: "Partner Referral Sharing",
      content: "Lifelong payout of 10% of net income from a new referred partner. (F15 brokerage sharing is also available)",
    },
  ]

  tnc= [
    `<ol>
      <li>Your referred clients first pay-in amount must be at least Rs.1000/- and should be traded only in Derivative Segments.</li>
      <li>Trading Segment Eligible for Incentives are NSE FNO, Currency & MCX (Only Cash Segments traded accounts are NOT eligible for Incentives)</li>
      <li>Commissions will be paid on the 5th of every month.</li>
      <li>You cannot refer to yourself, and you will not receive a commission on your own accounts.</li>
      <li>Your partner commission or incentive or status in the program may be suspended or terminated for any of the following reasons:
        <ul>
          <li>If any fraudulent accounts are discovered during the Incentive Payment, Alice Blue will have the authority to either hold or stop the payment release to that particular franchise.</li>
          <li>Inappropriate advertisements (false claims, misleading hyperlinks, etc.).</li>
          <li>Spamming (mass email, mass newsgroup posting, etc.).</li>
          <li>Advertising on sites containing or promoting illegal activities.</li>
          <li>Violation of intellectual property rights. Alice Blue reserves the right to require license agreements from those who employ trademarks of Alice Blue in order to protect our intellectual property rights.</li>
          <li>Offering rebates, coupons, or other forms of promised kick-backs from your affiliate commission as an incentive. Adding bonuses or bundling other products with Alice Blue, however, is acceptable.</li>
          <li>Self-referrals, fraudulent transactions, suspected Affiliate fraud.</li>
        </ul>
      </li>
      <li>In addition to the foregoing, Alice Blue reserves the right to hold the payments or terminate any partner account at any time, for any violations of these terms or no reason.</li>
      <li>In case of queries, feel free to write to <a href="mailto:partnersupport@aliceblueindia.com">partnersupport@aliceblueindia.com</a>

      <li>Partner Incentives Criteria example: 
        <ul>
          <li>The duration of the Account opening is 31 days (Example: 1st January - 31st January).</li>
          <li>The Account must be traded by the 15th of consecutive months (Eg: 15th February 2022).</li>
          <li>The Incentive amount will be released on the 5th of consecutive months (Eg: 5th March 2022).</li>
        </ul>
      </li>
      <br>
      </ol>
      <div>*The current month’s Partner Sharing and previous month incentives will be released on the 5th of consecutive months (February Partner Sharing + January Month Incentives = March Month)</div>`
  ]

  growth = [
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Partner/Icons/franchise-partner-scale.png",
      title: "Scale",
      "description": "Team up as a franchise partner with Alice Blue and become a part of our strong network covering 16+ cities",
      "link": "#"
    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Partner/Icons/franchise-partners-training.png",
      title: "Training",
      "description": "An effective, on-boarding training is provided to all franchise partners so they become a holistic part of the Alice Blue family",
      "link": "#"
    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Partner/Icons/support.png",
      title: "Exclusive Support",
      "description": "You can reach out to Alice Blue’s relationship manager at any point in time.",
      "link": "#"
    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Partner/Icons/access-to-api.png",
      title: "Access to APIs",
      "description": "Partners are given free access to APIs and dashboards making their business seamless & convenient",
      "link": "#"
    },
  ]

  faqs:any[] = [];
  config: boolean = false;

  customServeOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    // autoplay: true,
    autoplaySpeed: 1000,
    items: 3,
    margin: 10,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    nav: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    responsive: {
      0: {
        items: 1,
        margin: 20
      },
      468: {
        items: 2,
        margin: 20
      },
      768: {
        items: 3
      }
    }
  }
  //partner slider start
  testimonialOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    margin: 30,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      468: {
        items: 1,
      },
      768: {
        items: 1
      }
    }
  }

  testimonialData = [
    {
      content: "The API is completely free of cost. It can be integrated with many third-party applications to get the data & punch orders.",
      rating: 5,
      place:"Sitaram Panda, Orissa",
    },
    {
      content: "Alice Blue's application is easy to handle & I have also taken up sub-brokership which is working well. I am satisfied & look forward to continuing my work with Alice Blue.",
      rating: 4,
      place:"Gokul Chand, Hyderabad",
    },
    {
      content: "In my experience with Alice Blue there are some trust factors that anyone can rely on this company.<ul><li>Experience over 15 years in this capital market industry.</li><li>One of the very pioneer brokers especially in the mcx segment.</li><li>Always showing interest in adopting new technology and being in the state of the art user friendly softwares.</li><li>Convenient brokerage schemes and easy account opening process.</li><li>Friendly employees and supporting team.</li></ul>These are the major trust factors with competitive advantage. Any new comer(client) shall become a beneficiary of the company and their services.",
      rating: 4,
      place:"A. Sivakumar, Kumbakonam",
    },
    {
      content: "User friendly digital access of software and application. Best fit for beginners and can grow with the next level of trading. I recommend Alice Blue to my clients. Trade store products are worth using. Alice Blue is providing API for free. Single margin facility is one of the Highlighted options with Alice Blue which attracts all. All the best",
      rating: 4,
      place:"Nagaraj E, Chennai",
    },
    
  ]

  sliders = [
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Partner/partner-login.png",
      content: "Transparent dashboard to track all your leads, clients & earnings"
    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Partner/overview.png",
      content: "Analyze your performance by week, month, quarter or financial year"
    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Partner/account-details.png",
      content: "Request APIs & support"
    },
    
  ]

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

  partnerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    emailId: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    Mobile: new FormControl('', Validators.required),
    State: new FormControl('', Validators.required),
    knowledge: new FormControl('Yes', Validators.required),
    check: new FormControl('ckecked', Validators.required)
  });

  pageYoffset = 0;
  popup: any;

  constructor( 
    public dialog: MatDialog,
    private contactService: PartnerService,
    private snackbarService: SnackbarService,
    private scroll: ViewportScroller , 
    private faqservice : FaqService , 
    private router: Router , private meta: Meta ,
    @Inject(PLATFORM_ID) private platformId: any,
    private seoService: SeoService , private title: Title , 
    private popupservice: PopupService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageloader = false
    }, 300);
    this.getfaq()
    this.getSeoData()
    this.getPopupData()
  }

  toggle(index: number) {
    if (!this.config) {
      this.faqs.filter((menu, i) => i !== index && menu.active).forEach((menu) => (menu.active = !menu.active));
    }
    this.faqs[index].active = !this.faqs[index].active;
  }

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    if (isPlatformBrowser(this.platformId)) {
      this.pageYoffset = window.pageYOffset;
    }
  }

  scrollToTop(el: HTMLElement) {
    el.scrollIntoView();
    this.scroll.scrollToPosition([0, 0]);
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
      "name": this.partnerForm.value.name,
      "email": this.partnerForm.value.emailId,
      "mobile": this.partnerForm.value.Mobile,
      "state": this.partnerForm.value.State,
      "knowledge": this.partnerForm.value.knowledge.value,
      "check": this.partnerForm.value.check.value
    }
    this.contactService.createPartnerAccount(payload)
      .subscribe((response) => {
       
        this.formSubmitted = false;
        if (response.redirect_url) {
       
          window.open(response.redirect_url,"_self")
        }else {
          this.snackbarService.openSnackBar("mat-warn", response[0]);
        }
      
      }, (error) => {
        console.log(error)
        this.snackbarService.openSnackBar("mat-warn", error.error);
        this.formSubmitted = false;
      })
    }
  }

  openDialog() {
    this.dialog.open(PotentialCalculatorComponent, {
      disableClose: true,
      width: '400px',
    });
  }

  openTnc(tnc) {
    this.dialog.open(TCComponent , {
      data : tnc,
      disableClose: true,  
    })
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
