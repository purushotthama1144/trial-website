import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FaqService } from 'src/app/service/faq/faq.service';
import { HomeService } from 'src/app/service/home/home.service';
import { ContactService } from 'src/app/service/open-an-account/contact.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import * as $ from 'jquery';
import { SeoService } from 'src/app/service/seo/seo.service';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
declare var $: $

@Component({
  selector: 'app-capture-lead-open-account',
  templateUrl: './capture-lead-open-account.component.html',
  styleUrls: ['./capture-lead-open-account.component.scss'],
  
  
})
export class CaptureLeadOpenAccountComponent implements OnInit {

  isDragging = true;

  features = [
    {
      "img": "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/Icons/equity.png",
      "title": "Equity",

    },
    {
      "img": "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/Icons/commodities.png",
      "title": "Commodities",

    },
    {
      "img": "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/Icons/currencies.png",
      "title": "Currencies",

    },
    {
      "img": "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/Icons/derivatives.png",
      "title": "Derivatives",

    },
    {
      "img": "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/Icons/mutual-fund.png",
      "title": "Mutual Funds",

    },
    {
      "img": "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/Icons/ipo.png",
      "title": "IPOs",

    },
  ]

  AccOpeningSteps = [
    {
      "img": "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/Icons/fill-details.png",
      "title": "Fill Details",

    },
    {
      "img": "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/Icons/upload-documnets.png",
      "title": "Upload Documents",

    },
    {
      "img": "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/Icons/start-trading.png",
      "title": "Start Trading in 24 Hrs",

    },
  ]

  testimonialData = [
    {
      "img": "assets/images/preethi.jpg",
      "name": "Ms. Preeti Mukherjee",
      "date": "Patna",
      "rating": 5,
      "desc": "Alice Blue is having a very user friendly and effective platform. One can easily trade with this. The kind of margin they are giving, even a small trader can also trade with this. I am having account with other brokers as well, but no one is giving that much of margin level. Now I am easily continuing my trading career with Alice Blue. The customer service and support is very essential in a stock market. I don’t know Alice Blue as a person, but one person is there, who is Uttamji. His customer service and support is unparalleled. You won’t believe, I used to call him on Saturdays and Sundays, but he never says no to his customer. Thanks to Uttamji and thanks to Alice Blue."
     
    },
    {
      "img": "assets/images/girl.png",
      "name": "Mr. R. Bala Subaraminan",
      "date": "Coimbatore",
      "rating": 4,
      "desc": "I have been a franchisee for Alice Blue for 8 years, since 2012. I have not faced any problems so far. They provide good service and the pay-out is on time. Coimbatore branch is coordinating, and they have been offering good help. I wish the Best for them."
    },
    {
      "img": "assets/images/santhosh.jpg",
      "name": "Mr. Santosh",
      "date": "Coimbatore",
      "rating": 4,
      "desc": "I am a franchisee for Alice Blue from 2011. Alice Blue team has supported and provided good service for opening customer account, and pay-out. They support and help very well. The Coimbatore manager, Mr. Dinesh, helped me and supported me to grow my business. He provided very good support.  Thanks to Mr. Dinesh and Alice Blue team."
    },
    {
      "img": "assets/images/bhoopathi.jpg",
      "name": "Mr. Bhoopathi",
      "date": "Madurai",
      "rating": 4,
      "desc": "For the past one week I have been a franchise and have faced no problems so far in pay-out, and my customers are also satisfied. It’s been a good support from Alice Blue. Thank You."
    },
    {
      "img": "assets/images/girl.png",
      "name": "Mr. Srini Vasan Nikhitha",
      "date": "Chennai",
      "rating": 4,
      "desc": "I have been into equity and commodities trading for the last 5 years, and have joined Alice blue recently. Trading with Alice Blue has been a good experience as the ANT mobile application is very user friendly.  Queries from the support team get answered quickly and they do a follow up as well if the query is closed or not. It has been a good experience trading here and looking forward for many more good years to come."
    },
    {
      "img": "assets/images/avinash.jpg",
      "name": "Mr. Avinash Kumar",
      "date": "Delhi",
      "rating": 4,
      "desc": "The customer executives are really very supportive, and their software are really helpful. For me the best part is the intra-day return, is very high compared to other options, which is very good as it helps in compounding."
    },
    {
      "img": "assets/images/men.png",
      "name": "Mr. R.Manikanth Prabhu",
      "date": "Coimbatore",
      "rating": 4,
      "desc": "Whether it was for account opening, dealings, or any other queries they help us on time and there is proper response from them. I am also receiving my monthly payment on date. Thank You."
    },
    {
      "img": "assets/images/girl.png",
      "name": "Ms. Sridevi Avanigadda",
      "date": "Chennai",
      "rating": 4,
      "desc": "The app is wonderful and I am really satisfied with it. Chart view has much more indicators even in mobile app. Chart is really appreciated, Branch support well with trading calls and software support. Additional products like Trade store are very useful. Overall comparative to other softwares ANT is very good platform to trade."
    },
    {
      "img": "assets/images/sunaina.jpg",
      "name": "Ms. Sunaina",
      "date": "Mumbai",
      "rating": 4,
      "desc": "I have been associated with Alice Blue since the last 1 year. They are providing high margin, their software & apps are very good. They also provide free analysis. The support from the company is also good."
    },
  ]

  numberSays = [
    {
      "title": "15+",
      "subTitle": "Years of Trust"
    },
    {
      "title": "1.5 Lakh+",
      "subTitle": "Trusted Clients"
    },
    {
      "title": "10 Crore+",
      "subTitle": "Order Executed"
    },
    {
      "title": "125 Crore+",
      "subTitle": "Brokerage Saved"
    },
  ]

  faqs:any[] = [];
  config: boolean = false;

  homeData: any;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    // autoplay: true,
    autoplaySpeed: 1000,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    responsive: {
      0: {
        items: 1
      },
      468: {
        items: 2
      },
      740: {
        items: 2
      },

    },
    nav: true
  }

  customAwardOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    // autoplay: true,
    autoplaySpeed: 1000,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    responsive: {
      0: {
        items: 1
      },
      468: {
        items: 1
      },
      740: {
        items: 1
      }
    },
    nav: false
  }

  pricingDetails = [
    {
      "price":"₹0/order",
      "title":"Stocks",
      "desc":"Invest in equity delivery free of charge"
    },
    {
      "price":"₹0",
      "title":"Mutual Funds",
      "desc":"Invest in commission free MFs"
    },
    {
      "price":"₹15/order",
      "title":"All Segments",
      "desc":"Freedom 15 plan for all Intraday & F&O, Currencies & Commodity Orders"
    },
  ]
bannerText = ['Advanced trading platform' , 'Low brokerage charges' , 'Single account for Trading & Investing']

exclusiveBenefits = [
  {
    "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/Logo/tradestore.png",
    "title":"TradeStore",
    "desc":"India’s first e-commerce platform for trading and investment products. Pick a product that fits your needs. Improve your trading accuracy & profits.",
    "link":"https://play.google.com/store/apps/details?id=com.tradestore"
  },
  {
    "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/Logo/trade-school.png",
    "title":"TradeSchool",
    "desc":"Become a trading and investing pro, learn from stock market experts. Courses & webinars to help you in your financial journey.",
    "link":"https://play.google.com/store/apps/details?id=com.tradeschool"
  },
  {
    "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/Logo/digipromo.png",
    "title":"DigiPromo",
    "desc":"Start your side income today with Alice Blue’s 2-sided referral program. Use DigiPromo to share valuable content & generate leads.",
    "link":"https://play.google.com/store/apps/details?id=com.alicedigilink"
  },
]

tradingEdges = [
  {
    "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/ant-mobi.png",
    "title":"ANT Mobi",
    "sDesc":"Mobile trading platform to help you trade on the go.",
    "desc":"Trade seamlessly on your Android Smartphone or tablet. ANT Mobi supports single tap buy/sell and direct trade from the chart. <br><br> <b>ANT Mobi Features:</b> <br><br> <ul> <li>Trade from the chart available on the ANT Mobi</li><li>Bracket order option available for NSE , FNO,MCX</li><li>All products(CO,MIS,NRML,CNC,MTF)  available for trade execution</li><li>Complete option to view trade execution history</li><li>High-performance charts</li><li>Complete control over a trading account</li><li>Access anywhere and anytime</li><li>6 types of charts</li><li>15 time-frames</li><li>69 technical indicators</li><li>11 analytical objects</li><li>Exchanges — NSE, BSE, MCX</li><li>Multiple market-watch and live market depths</li><li>5+ Year of free historical chart data</li><li>Daily Reports & Research Reports</li><li>20 market depth facility</li><li>Top screeners & Pivot levels are available .</li><li>EDIS option for Non-POA clients ,they can execute trade without POA</li></ul>"
  },
  {
    "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/ant-web.png",
    "title":"ANT Web",
    "sDesc":"Online Web trading platform to enable trading from any browser & OS.",
    "desc":"The ANT Web platform allows you to trade Shares, Commodities, and Indices from any browser and operating system (Windows, Mac, and Linux) with no additional software. Access your account and start trading in just a couple of clicks.<br><br> <b>ANT Web Features:</b> <br><br> <ul> <li> Deal through charts<li>Margin calculator</li><li> One-click dealing</li><li>Fully customizable interface</li><li> Multiple watch lists</li><li>Transparent pricing</li>"
  },
  // {
  //   "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/ant-desk.png",
  //   "title":"ANT Desk",
  //   "sDesc":"Desktop trading platform to help you trade on the go.",
  //   "desc":"ANT Desk is a fast, secure and flexible way to trade Equity, Indices, Precious Metals, Commodities and Foreign Exchange today’s markets.<br><br> <b>ANT Desk Features:</b> <br><br> <ul> <li>Extremely user-friendly interface for new and experienced traders.</li><li>Advanced Charting Tools.</li><li>Multi chart Watch list</li><li>Advanced Charting & Analysis ( Intraday & Historical)</li><li>After Market Order Book</li><li>Live Streaming Quotes</li><li>Advanced Charting Features</li><li>Predefined MW list</li><li>Trade In BSE, NSE, MCX, Currency</li><li>Pattern Finder</li><li>Advanced Charts – 30 Days Intraday</li><li>10 Years Historical Data With 80+ Studies For Advance Technical Analysis And Reference While Making A Trade Decision</li><li>Fast Execution Of Orders With Real Time Monitoring</li><li>Daily Reports & Research Reports</li><li>Semi Algos, Strategies & Backtesting</li><li>Expert Advisors</li></ul>"
  // },
  {
    "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/ant-plus-api.png",
    "title":"ANT Plus API",
    "sDesc":"Mobile trading platform to help you trade on the go.",
    "desc":"Develop your own frontend trading platform.<br><br> <b>ANT Plus API Features</b>:<br><br> <ul> <li>Integrating your trading platform with third party tools like MT4, Amibroker or website</li><li>API supports major language ( Phython, JS (easy plugin button) , JSON)</li><li>API supports all products type orders (Basket & Bracket order)</li><li>API will support 200 message requests per sec from one source.</li><li>Access Best Live Feeds API to our clients seamlessly</li></ul>"
  },
  {
    "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/algo-trading.png",
    "title":"Algo Trading",
    "sDesc":"Choose from over 15 Algo trading products on TradeStore.",
    "desc":""
  },
  {
    "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Open+an+account/mutual-funds.png",
    "title":"Mutual Funds",
    "sDesc":"Invest in the best mutual funds.",
    "desc":""
  },
]

accountopenForm = new FormGroup({
  firstName: new FormControl('', Validators.required),
  // lastName: new FormControl('', Validators.required),
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

  constructor(private homeService: HomeService, 
    private snackbarService: SnackbarService,
    private contactService: ContactService ,
    private faqservice : FaqService , 
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router , private meta: Meta , 
    private seoService: SeoService , private title: Title) { }
  shown: boolean = false;
  formSubmitted: boolean = false;

  
  ngOnInit(): void {
    this.tradingEdges.forEach((tradingEdge)=>{
      tradingEdge['knowMore'] = false
    })
    this.displayCities = this.cities;
    this.getHomeData()
    this.getfaq()
    this.getSeoData()
  }

  toggle(index: number) {
    if (!this.config) {
      this.faqs.filter((menu, i) => i !== index && menu.active).forEach((menu) => (menu.active = !menu.active));
    }
    this.faqs[index].active = !this.faqs[index].active;
  }

  knowMore(index) {
    this.tradingEdges.forEach((tradingEdge,tradingEdgeIndex)=>{
      if(tradingEdgeIndex == index){
        this.tradingEdges[tradingEdgeIndex]['knowMore'] = !this.tradingEdges[tradingEdgeIndex]['knowMore'];
      }
      else{
        this.tradingEdges[tradingEdgeIndex]['knowMore'] = false;
      }
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
    this.contactService.digipromoAccount(payload)
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

  getHomeData() {
    this.homeService.getHomeData()
      .subscribe((response) => {
        this.homeData = response
      }, (error) => {

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
      { name: 'robots' , content : 'none' },
      { name: 'robots' , content : 'noindex, follow' },
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
