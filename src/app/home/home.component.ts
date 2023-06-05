import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from '../service/home/home.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { isPlatformBrowser } from '@angular/common';
import { PopupService } from '../service/popup/popup.service';
import { Router } from '@angular/router';
import { SeoService } from '../service/seo/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  url = this.router.url;
  popup : any;
  isDragging: boolean = false;
  loading : boolean = true;
  pageloader:boolean = true

  tradewithlist : any;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    autoplay: true,
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

  // customAwardOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: true,
  //   navSpeed: 300,
  //   autoplay: true,
  //   autoplaySpeed: 1000,
  //   navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     468: {
  //       items: 1
  //     },
  //     740: {
  //       items: 1
  //     }
  //   },
  //   nav: false
  // }

  benefits:any[] = [
    {
      "card_heading":"Single Margin",
      "card_body":"Trade with single margin across NSE, BSE & MCX.",
      "card_link":""
    },
    {
      "card_heading":"MTF & CO",
      "card_body":"Benefit from Cover Order in options trading & Margin Traded Funds in all other segments.",
      "card_link":""
    },
    {
      "card_heading":"Simplified Brokerage",
      "card_body":"Spend your time trading, not wondering what it costs. Choose Freedom15 brokerage plan.",
      "card_link":"/pricing"
    },
    {
      "card_heading":"Trade Store",
      "card_body":"Access India's first products marketplace with over 20 tools for traders, investors & strategists.",
      "card_link":"https://tradestore.aliceblueonline.com/"
    },
    {
      "card_heading":"Trade School",
      "card_body":"Market insights, education, and resources from industry experts.",
      "card_link":"https://tradeschool.aliceblueonline.com/"
    },
    {
      "card_heading":"API's",
      "card_body":"Get free advanced API access to tailor your strategies.",
      "card_link":"/ant-plus"
    },
  ]
  // in_press = [
  //   {
  //     alt:"Indian Express",
  //     press_image_path:"https://alicewebsite.s3.ap-south-1.amazonaws.com/cms/uploaded-files/images/admin-cms$ab_cms$1628502615988.png",
  //     press_description:" “They are awarded by the Multi Commodity Exchange (MCX) as the ‘Highest Volume Generator in Commodities.” "
  //   },
  //   {
  //     alt:"Business Today",
  //     press_image_path:"https://alicewebsite.s3.ap-south-1.amazonaws.com/cms/uploaded-files/images/admin-cms$ab_cms$1628503586463.png",
  //     press_description:"“Alice Blue – high exposure broker in India, which started in 2012, has become a trustworthy name in the field of stock broking helping traders in India.”"
  //   },
  //   {
  //     alt:"Telegraph",
  //     press_image_path:"https://alicewebsite.s3.ap-south-1.amazonaws.com/cms/uploaded-files/images/admin-cms$ab_cms$1628503355966.png",
  //     press_description:"“Bangalore based Best stock brokerage firm, Alice Blue has extended its reach to tech-savvy youngsters and tier-2 & tier-3 cities, where facilities are limited.”"
  //   },
  //   {
  //     alt:"Zee",
  //     press_image_path:"https://alicewebsite.s3.ap-south-1.amazonaws.com/cms/uploaded-files/images/admin-cms$ab_cms$1628503027794.png",
  //     press_description:"“Alice Blue – Best stock brokerage company launches a free investor education program and lots of online training sessions. This is given for everyone through the “Knowledge base” section of their website.”"
  //   },
  // ]
  // awards = [
  //   {
  //     awards_title:"Best Stock Broker For New Investors",
  //     alt:"Best Stock Broker for New Investors",
  //     awards_image_path:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Homepage+/award-3.webp",
  //     awards_description:" Times Business Awards 2021 - A celebration of business excellence "
  //   },
  //   {
  //     awards_title:"Best stock brokerage Company",
  //     alt:"Best Stock Brokerage Company",
  //     awards_image_path:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Homepage+/mcx-2.webp",
  //     awards_description:"Alice Blue – Best stock brokerage Company – Energy” Award from MCX 2017-18"
  //   },
  //   {
  //     awards_title:"Gem of India Award",
  //     alt:"Gem of India",
  //     awards_image_path:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Homepage+/gem.webp",
  //     awards_description:" Gem of India Award 2013 "
  //   },
  //   {
  //     awards_title:"Best Investment Company",
  //     alt:"Best Investment company award",
  //     awards_image_path:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Homepage+/award-1.webp",
  //     awards_description:"Best Investment Company in Southern India 2016-17"
  //   },
  //   {
  //     awards_title:"Best Broking House",
  //     alt:"Best broking House",
  //     awards_image_path:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Homepage+/mcx-1.webp",
  //     awards_description:"Best Broking House – South” Award from MCX 2018-19"
  //   },
  // ]

  cards_data = [
    {
      card_description: "LIC has been dominating India's insurance industry for the past 66 years. The company has recently filed its DRHP, and its IPO might be launched in no time. According to sources, the LIC IPO might be one of the biggest of all times. Don’t miss this once in a lifetime opportunity!",
      card_link: "/lic-ipo",
      alt:"LIC IPO",
      card_logo_image_path: "https://alicewebsite.s3.ap-south-1.amazonaws.com/cms/ebook/1645171431950/Lic-Logo-90-60.png",
      card_title: "LIC IPO is Here!",
    },
    {
      card_description: "How often you earn from what you love to do and how rare you earn for life from what you love to do! Lookupto our 2-Sided Referral program – a first in the industry assuring you of 10% lifetime commission plus Rs 500 + 10% brokerage as cashback for 30 days!",
      card_link: "/refer-us",
      alt:"2-sided referral program",
      card_logo_image_path: "assets/images/home/2-sided.webp",
      card_title: "Industry’s First 2-Sided Referral Program",
    },
    {
      card_description: "At Alice Blue, we know you love to trade and we are always looking to enhance your trading experiences with us. To this effect, we have come out with the Freedom15 plan to give you a direct benefit of 25% lesser brokerage on your trades.  We hope you will love the F15 Plan!",
      card_link: "/pricing",
      alt:"Discount trading plan",
      card_logo_image_path: "assets/images/home/f15.webp",
      card_title: "F15 Plan Release",
    },

  ]

  imageleftTextright = {
    image: "assets/images/home/trade.webp",
    alt:"Trade With Ease",
    list: `<ul><li>Real-time Feeds with 20 Depth Buy/Sell Bids.</li>
              <li>Ultra speed &amp; Ultra light for all your Trading needs.</li>
              <li>EDIS for Equity Delivery. EDIS (Electronic Delivery Instruction Slip) helps you sell shares without POA.</li>
              <li>Separate dashboard with Market Movers, Indices, OrderBook,and Margin details.</li>
              <li>Advanced charting with 100+ indicators.</li>
              <li>Set unlimited number of price alerts for instant updates.</li>
              <li>Easy and Fast Transfer of funds with UPI &amp; Net banking.</li>
              </ul>`,
    button:"Discover Now",
    buttonLink:"/ant",
    isHome:true
  }

  homeData: any;

  videoIcon:string = "assets/images/home/play.webp";
  play:string = "Play";
  videodisabled:boolean = true;

  constructor(private router: Router,
    private seoService: SeoService,
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: any,
    private homeService : HomeService,
    public dialog: MatDialog,
    private popupservice: PopupService) {}

  ngOnInit() {
    setTimeout(() => {
      this.pageloader = false
    }, 300);
    this.getPopupData()
    // this.getHomeData();
    this.getSeoData();

  }

  changeImg(){
    if(this.play == "Play")
    {
      this.play = "Pause",
      this.videoIcon = "assets/images/home/play.webp",
      this.videodisabled = false
    }
    else
    {
      this.videoIcon = "assets/images/home/play.webp",
      this.play = "Play",
      this.videodisabled = true
    }
  }

  openHref(siteUrl){
    if (isPlatformBrowser(this.platformId)) {
      window.open("//" + siteUrl, '_blank');
    }
  }

  getHomeData() {
    this.loading = true;
    this.homeService.getHomeData()
      .subscribe((response) => {
        if(response){
          this.imageleftTextright.image = response.trade_with_ease.trade_with_ease_image
          this.imageleftTextright.list = response.trade_with_ease.trade_with_ease_paragraph
          this.imageleftTextright.buttonLink = response.trade_with_ease.trade_with_ease_link
          this.benefits = response.not_price_advantage.cards
          this.homeData = response;
          if(this.homeData.video_section.video_url){
            this.homeData.video_section.video_url = `${this.homeData.video_section?.video_url}?autoplay=1&mute=1&controls=0`;
          }

        }
        this.loading = false;
      }, (error) => {

        this.loading = false;
      })
  }

  getPopupData() {
    // this.dialog.open(PopupComponent, {
    //   data : {
    //     data : this.popup
    //   },
    //   disableClose: false,
    //   width: '30%',
    //   panelClass: 'custom-modalbox',
    //   position: {
    //     bottom: '0px',
    //     left:'0px'
    //   }
    // });
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
      } else {

      }
    } , (error) => {
      console.log(error)
    })
  }

  // dynamic seo
  // getSeoData() {
  //   const data = {
  //     "page_url": `https://aliceblueonline.com${this.router.url.substring(0,this.router.url.length-1)}`
  //   }
  //   this.seoService.createCanonicalURL();
  //   this.seoService.fetchSeoData(data).subscribe((response) => {

  //   this.meta.addTags([
  //     // { name: 'title' , content : response.meta_title ? response.meta_title : '' },
  //     { property: 'og:title' , content : response.og_title ? response.og_title : '' },
  //     { name: 'description' , content : response.meta_desc ? response.meta_desc : '' },
  //     { property: 'og:description', content: response.og_desc ? response.og_desc : '' },
  //     { property: 'og:image', content: response.og_image ? response.og_image : '' },
  //     { property: 'og:image:height', content: response.og_image_height ? response.og_image_height : '' },
  //     { property: 'og:image:width', content: response.og_image_width ? response.og_image_width : '' },
  //     { property: 'og:site_name', content: response.og_site ? response.og_site : '' },
  //     { property: 'og:type', content: response.og_type ? response.og_type : '' },
  //     { property: 'og:url', content: response.og_url ? response.og_url : '' },
  //     { name: 'twitter:title', content: response.twitter_title ? response.twitter_title : '' },
  //     { name: 'twitter:card', content: response.twitter_type ? response.twitter_type : '' },
  //     { name: 'twitter:site', content: response.twitter_site ? response.twitter_site : '' },
  //     { name: 'twitter:description', content: response.twitter_description ? response.twitter_description : '' },
  //     { name: 'twitter:image', content: response.twitter_image ? response.twitter_image : '' },
  //     { name: 'twitter:creator', content: response.twitter_handle ? response.twitter_handle : '' },
  //     { name: 'twitter:url', content: response.twitter_url ? response.twitter_url : '' },
  //   ]);
  //   this.title.setTitle(response.title);
  //   } , (error) => {
  //     console.log(error)
  //   })
  // }


  // static seo
  getSeoData() {
    this.meta.addTags([
      // // { name: 'title' , content : 'Alice Blue - Lowest brokerage Online Trading account in India' },
      { property: 'og:title' , content : 'Alice Blue - Lowest brokerage Online Trading account in India' },
      { name: 'description' , content : 'Alice Blue - India Best stock broker offering Lowest brokerage fee in Stock market Industry. We offer Commodity trading, Equity Trading, Futures Trading.' },
      { property: 'og:description', content : 'Alice Blue - India Best stock broker offering Lowest brokerage fee in Stock market Industry. We offer Commodity trading, Equity Trading, Futures Trading.' },
      { property: 'og:image', content : 'https://alicewebsite.s3.ap-south-1.amazonaws.com/cms/uploaded-files/images/admin-cms$ab_cms$1630645487842.png' },
      { property: 'og:image:height', content : '294' },
      { property: 'og:image:width', content : '400' },
      { property: 'og:site_name', content : 'Alice Blue' },
      { property: 'og:type', content : 'Website' },
      { property: 'og:url', content : 'https://aliceblueonline.com' },
      { name: 'twitter:title', content : 'Alice Blue - Lowest brokerage Online Trading account in India' },
      { name: 'twitter:card', content : '' },
      { name: 'twitter:site', content : '@aliceblue_india' },
      { name: 'twitter:description', content : 'Alice Blue - India Best stock broker offering Lowest brokerage fee in Stock market Industry. We offer Commodity trading, Equity Trading, Futures Trading.' },
      { name: 'twitter:image', content : 'https://alicewebsite.s3.ap-south-1.amazonaws.com/cms/uploaded-files/images/admin-cms$ab_cms$1630645487842.png' },
      { name: 'twitter:creator', content : '@aliceblue_india' },
      { name: 'twitter:url', content : '' },
      { name: 'twitter:type', content : 'summary' },
      { name: 'robots:text', content : 'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large' },
    ]);
    this.seoService.createCanonicalURL();
    this.title.setTitle('Alice Blue - Lowest brokerage Online Trading account in India');
  }
}