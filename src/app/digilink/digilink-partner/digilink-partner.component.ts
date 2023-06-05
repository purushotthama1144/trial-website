import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PopupComponent } from 'src/app/home/popup/popup.component';
import { PotentialCalculatorComponent } from 'src/app/partner/potential-calculator/potential-calculator.component';
import { DigilinkService } from 'src/app/service/digilink/digilink.service';
import { FaqService } from 'src/app/service/faq/faq.service';
import { PopupService } from 'src/app/service/popup/popup.service';
import { SeoService } from 'src/app/service/seo/seo.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { TCComponent } from '../t-c/t-c.component';


@Component({
  selector: 'app-digilink-partner',
  templateUrl: './digilink-partner.component.html',
  styleUrls: ['./digilink-partner.component.scss'],
  
})
export class DigilinkPartnerComponent implements OnInit {
  isDragging: boolean = false;
  pageloader: boolean = false;

  faqs:any[] = [];
  config: boolean = false;

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

  //Sales start
  features = [
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Digilink+For+Partner/Icons/easy-to-use.png",
      title: "Easy To Use",

    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Digilink+For+Partner/Icons/effective-leads-conversion-tracking.png",
      title: "Effective Leads & Conversion Tracking",

    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Digilink+For+Partner/Icons/client-wise-earning-tracking.png",
      title: "Client-wise Earning tracking",

    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Digilink+For+Partner/Icons/reliable-accurate-dashboard.png",
      title: "Reliable & Accurate Dashboard",

    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Digilink+For+Partner/Icons/realtime-reporting.png",
      title: "Realtime Reporting",

    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Digilink+For+Partner/Icons/trusted-by-over-7K-partners.png",
      title: "Trusted by over 7K Partners",

    },
  ]

  clientCode: string = "";
  copyLink :string = "" 
  // shareLink = `https://partnersekyc.aliceblueonline.com:88/Openpartneraccount/Register?C=undefined`
  shareLink = `https://aliceblueonline.com/open-account-fill-kyc-request-call-back?C=undefined`
  
  customSalesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    autoplay: true,
    autoplaySpeed: 1000,
    margin: 20,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    nav: true,
    responsive: {
      0: {
        items: 1
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

  offers = [];

  earnmodes = [
    {
      title: "Trading Revenue Sharing",
      description: "Standard Revenue Sharing Per Eligibility Criteria",
    },
    {
      title: "Clients Traded Incentive",
      //description: "For 6-24 clients, earn Rs.100 per traded account & for 25+ clients earn Rs.150 per traded account",
      description: "For 6-24 clients, earn Rs.200 per traded account , for 25-49  clients earn Rs.300 per traded account &  for 50+ clients earn Rs.600 per traded account",
    },
    {
      title: "Mutual Funds Revenue Sharing",
      description: "Earn Rs. 10 per trade from Mutual Fund transactions",
    },
    {
      title: "Partner Referral Sharing",
      description: "Lifelong payout of 10% of net income from a new referred partner. (F15 brokerage sharing is also available)",
    },

  ]
 
  tickInterval = 1;
  autoTicks = false;
  showTicks = false;

  existingClientValue = 10;
  existingClientPercent = 10/100;
  existingClientResult = 5000;

  referredClientValue = 5000;
  referredClientPercent = 50/100;
  referredClientResult = 25000;

  safeSrc: SafeResourceUrl;
  
  videoIcon:string = "assets/images/play.png";
  play:string = "Play";
  videodisabled:boolean = true;

  url = this.router.url;
  popup : any;

  facebook_text = `Would highly recommend checking out Alice Blues ANTMobi App for trading & investing. Open an account & get lifetime free equity delivery trades. A must-try is their unique Trade Store App which is just a bundle of surprises! Join using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`
  twitter_text = `Check out Alice Blues ANTMobi App for trading & investing. Open an account using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`
  telegram_text=`Hi, check out Alice Blue. I strongly recommend trying their platform for Investments. You can open an account and invest using their ANTMobi app. A must-try is their unique Trade Store App which is just a bundle of surprises! Join using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`
  linkedin_text =`Would highly recommend checking out Alice Blues ANTMobi App for trading & investing. Open an account & get lifetime free equity delivery trades. A must-try is their unique Trade Store App which is just a bundle of surprises! Join using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`
  whatsapp_text =`Hi, check out Alice Blue. I strongly recommend trying their platform for Investments. You can open an account and invest using their ANTMobi app. A must-try is their unique Trade Store App which is just a bundle of surprises! Join using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`

  constructor(private sanitizer: DomSanitizer , private dialog : MatDialog , private faqservice: FaqService , private meta: Meta, 
    private seoService: SeoService, private title: Title, private router: Router , private popupservice: PopupService , private snackbarService : SnackbarService , private digilinkService: DigilinkService) {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/YSA7KjJFaFQ?autoplay=1&mute=1&controls=0'
      // 'https://www.youtube.com/embed/YSA7KjJFaFQ'
    );
  }

  ngOnInit(): void {
    this.referredClientBrokerage;
    this.getfaq()
    this.getSeoData()
    this.getPopupData()
    this.getdigilinkPartnerdata()
  }

  changeImg(){
    if(this.play == "Play") {
      this.play = "Pause",
      this.videoIcon = "assets/images/play.png",
      this.videodisabled = false
    }
  }

  stopVideo() {
    this.videodisabled = true
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    
    return value;
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  referredClientBrokerage() {
    this.existingClientResult = this.existingClientValue * this.referredClientValue * this.existingClientPercent
    this.referredClientResult = this.existingClientValue * this.referredClientValue * this.referredClientPercent
  }

  openDialog() {
    this.dialog.open(PotentialCalculatorComponent, {
      disableClose: true,
      width: '400px',
    });
  }

  generateLink() {
    if(this.clientCode){
      this.snackbarService.openSnackBar("mat-primary", "Generated link Successfully");
      this.copyLink = `https://aliceblueonline.com/open-account-fill-kyc-request-call-back?C=${this.clientCode}`;
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

  toggle(index: number) {
    if (!this.config) {
      this.faqs.filter((menu, i) => i !== index && menu.active).forEach((menu) => (menu.active = !menu.active));
    }
    this.faqs[index].active = !this.faqs[index].active;
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
      "page_url":this.url == '/'?'/':this.url
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

  getdigilinkPartnerdata() {
    this.pageloader = true
    this.digilinkService.digilinkClientData().subscribe((response) => {
      setTimeout(() => {
        this.pageloader = false
      }, 300);
      this.offers = JSON.parse(response.cards_json) 
    }, (error) => {

    })
  }
}
