import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.scss'],
  
})
export class SiteMapComponent implements OnInit {
  pageloader:boolean = true
  urlList = [
    {
      "title":"Trading Platform",
      "urls":[
        {
          "urltitle":"ANT Mobi",
          "routerlink":"/ant-mobi",
          "externallink":""
        },
        // {
        //   "urltitle":"ANT Desk",
        //   "routerlink":"/ant-desk",
        //   "externallink":""
        // },
        {
          "urltitle":"ANT Web",
          "routerlink":"/ant-web",
          "externallink":""
        },
        {
          "urltitle":"ANT Plus",
          "routerlink":"/ant-plus",
          "externallink":""
        },
      ]
    },
    {
      "title":"Investment Platform",
      "urls":[
        {
          "urltitle":"IPO",
          "routerlink":"",
          "externallink":"https://ipo.aliceblueonline.com"
        },
        {
          "urltitle":"Mutual Funds",
          "routerlink":"",
          "externallink":"https://mutualfunds.aliceblueonline.com/"
        },
        {
          "urltitle":"Equity SIP",
          "routerlink":"",
          "externallink":"https://eqsip.aliceblueonline.com/"
        },
      ]
    },
    {
      "title":"Trading Assistance",
      "urls":[
        {
          "urltitle":"Call and Trade Dealing Desk",
          "routerlink":"/call-trade",
          "externallink":""
        },
        {
          "urltitle":"Trade Store",
          "routerlink":"",
          "externallink":"https://tradestore.aliceblueonline.com/"
        },
        {
          "urltitle":"Trading Holidays",
          "routerlink":"/trading-holidays-2022",
          "externallink":""
        },
        {
          "urltitle":"Economic Calendar",
          "routerlink":"",
          "externallink":"/economic-calender"
        },
        {
          "urltitle":"App Store",
          "routerlink":"",
          "externallink":"/ab-store"
        },
      ]
    },
    {
      "title":"Tools",
      "urls":[
        {
          "urltitle":"Brokerage Calculator",
          "routerlink":"/brokerage-calculator",
          "externallink":""
        },
        {
          "urltitle":"Margin Calculator",
          "routerlink":"/margin-calculator",
          "externallink":""
        },
        {
          "urltitle":"Option Calculator",
          // "routerlink":"/margin-calculator/nifty-and-bank-nifty",
          "externallink":"https://ant.aliceblueonline.com/margin-calculator/"
        },
        {
          "urltitle":"Pivot Points",
          "routerlink":"/pivot-points",
          "externallink":""
        },
        {
          "urltitle":"RMS Live",
          "routerlink":"/rms-live-updates",
          "externallink":""
        },
        {
          "urltitle":"Trade Link",
          "routerlink":"/trade-link",
          "externallink":""
        },
      ]
    },
    {
      "title":"Demat and Trading Account",
      "urls":[
        {
          "urltitle":"Open an Account",
          "routerlink":"/open-account-fill-kyc-request-call-back",
          "externallink":""
        },
        {
          "urltitle":"Pricing",
          "routerlink":"/pricing",
          "externallink":""
        },
        {
          "urltitle":"BOT Login",
          "routerlink":"",
          "externallink":"https://bot.aliceblueonline.com/"
        },
        {
          "urltitle":"KYC Tracker",
          "routerlink":"",
          "externallink":"https://app.aliceblueonline.com/digilink/LeadTracker.aspx"
        },
        {
          "urltitle":"Fund My Account",
          "routerlink":"",
          "externallink":"https://funds.aliceblueonline.com/"
        },
        {
          "urltitle":"Bank Details",
          "routerlink":"/bank-details",
          "externallink":""
        },
      ]
    },
    {
      "title":"Become a Partner",
      "urls":[
        {
          "urltitle":"Open a Partner Account",
          "routerlink":"/business-partner",
          "externallink":""
        },
        {
          "urltitle":"DigiLink Partner Dashboard",
          "routerlink":"",
          "externallink":"https://partners.aliceblueonline.com"
        },
      ]
    },
    {
      "title":"Education",
      "urls":[
        {
          "urltitle":"Trade School",
          "routerlink":"https://tradeschool.aliceblueonline.com",
          "externallink":""
        },
        {
          "urltitle":"ANT IQ Blogs",
          "routerlink":"/antiq",
          "externallink":""
        },
        {
          "urltitle":"Free Resources",
          "routerlink":"/ebook",
          "externallink":""
        },
        {
          "urltitle":"Webinars",
          "routerlink":"",
          "externallink":"https://tradeschool.aliceblueonline.com/all-webinars"
        },
      ]
    },
    {
      "title":"Referral",
      "urls":[
        {
          "urltitle":"Refer Us",
          "routerlink":"/refer-us",
          "externallink":""
        },
        {
          "urltitle":"DigiLink for Clients",
          "routerlink":"/digilink-client-version",
          "externallink":""
        },
        {
          "urltitle":"DigiLink for Partners",
          "routerlink":"/digilink-for-partner",
          "externallink":""
        },
        {
          "urltitle":"DigiPromo",
          "routerlink":"/digipromo",
          "externallink":""
        },
      ]
    },
    {
      "title":"Company",
      "urls":[
        {
          "urltitle":"About Us",
          "routerlink":"/about-us-best-brokerage-firm",
          "externallink":""
        },
        {
          "urltitle":"Careers",
          "routerlink":"/careers",
          "externallink":""
        },
        {
          "urltitle":"HRMS Login",
          "routerlink":"",
          "externallink":"https://hrms.aliceblueonline.com"
        },
        {
          "urltitle":"Achievements",
          "routerlink":"/achievements",
          "externallink":""
        },
        {
          "urltitle":"Legal Documentation",
          "routerlink":"/legal-documentation",
          "externallink":""
        },
      ]
    },
    {
      "title":"Support",
      "urls":[
        {
          "urltitle":"Contact Us",
          "routerlink":"/contact-us",
          "externallink":""
        },
        {
          "urltitle":"Circulars",
          "routerlink":"/circulars",
          "externallink":""
        },
        {
          "urltitle":"Downloads",
          "routerlink":"/downloads",
          "externallink":""
        },
        {
          "urltitle":"Locate Us",
          "routerlink":"/locate-us",
          "externallink":""
        },
        {
          "urltitle":"FAQs",
          "routerlink":"/support",
          "externallink":""
        },
        {
          "urltitle":"How to Videos",
          "routerlink":"/how-to-videos",
          "externallink":""
        },
        {
          "urltitle":"Feedback",
          "routerlink":"/feedback",
          "externallink":""
        },
      ]
    },
  ]
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageloader = false
    }, 300);
  }

}
