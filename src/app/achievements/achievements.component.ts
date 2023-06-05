import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PopupComponent } from '../home/popup/popup.component';
import { PopupService } from '../service/popup/popup.service';
import { SeoService } from '../service/seo/seo.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],

})
export class AchievementsComponent implements OnInit {
  pageloader:boolean = true
  achievements: any[] = [
    // "We continue to retain our position as ‘<span>Top 10 customer-preferred Financial Enabler in India</span>’ and ‘<span>Number 1</span>’ in south India.",
    // "In 19-20, our year-on-year growth was ~<span>275% in terms of UCC accounts</span>",
    // "The <span>number of trades grew by an impressive 245%</span> year-on-year",
    // "We added over <span>50 specialized apps</span> in our App marketplace Trade Store",
    // "We were awarded the ‘<span>Best Stock Broker for New Investors</span>’ from the prestigious Times Group",
    // "We launched the ‘<span>Aspiring Investors</span>’ program targeted towards first time investors / traders to <span>enable them in their journey</span> into the stock market"
    `We have maintained our reputation as India's 'Top 10 Customer-Preferred Financial Enabler' and 'Number 1' in South India.`,
    `We were awarded the ‘Best Stock Broker for New Investors’ from the prestigious Times Group and as one of the “Top 3 contributors in Equity Derivatives” by NSE in 2021.`,
    `In 2019-20, our year-on-year growth was ~275% in terms of UCC accounts, and the number of trades grew by an impressive 245% year-on-year.`,
    `We added over 50 specialized trading apps to our App Marketplace Trade Store.`,
    `We launched Live Courses and Webinars for the ‘Aspiring Investors’ program targeted towards first-time investors/traders to enable them in their journey into the stock market.`,
    `Our trading platforms have improved significantly over time to offer clients a smooth trading experience.`,
    `Innovations have been done in the areas of KYC, and we have implemented V 2.0 in PRO account activation and pledging of shares in MCX CCL.`,
    `Our Risk Management System is now more actively updating market-related information and is taking necessary steps to avoid short margin penalties.`,
    `We are expanding our operations and have applied for an NBFC license from RBI under the name of Alice Blue Capital Services Pvt Ltd.`,
    `We have also incorporated Aliceblue Insurance Broking Private Ltd and a registered Integrity Financial Services Partnership Firm.`
  ]

  url = this.router.url;
  popup : any;
  isDragging : boolean = true

  constructor(private meta: Meta , private title: Title , private router: Router , private seoService: SeoService , public dialog: MatDialog , private popupservice: PopupService) { }
  
  customSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 200,
    // autoplay: true,
    autoplaySpeed: 800,
    items: 4,
    margin: 5,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      468: {
        items: 3,
        nav: true,
      },
      768: {
        items: 4
      }
    }
  }

  journeyData = [
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/MCX+Membership.png",
      "year":"2007",
      "title":"MCX Membership"
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/NSE+Membership.png",
      "year":"2008",
      "title":"NSE Membership"
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/NCDEX+Membership.png",
      "year":"2009",
      "title":"NCDEX Membership"
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/MCZX+n+NSE+Membership.png",
      "year":"2012",
      "title":"MCX-SX and NSE (EQ&FO) Membership"
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/BSE+EQ+and+FO+Membership.png",
      "year":"2014",
      "title":"BSE EQ&FO Membership"
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/CDSL+Membership.png",
      "year":"2015",
      "title":"CDSL Membership"
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/Branch+Expansion.png",
      "year":"2016",
      "title":"Branch expansion from 5 to 15 across India"
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/NSE+currencies.png",
      "year":"2019",
      "title":"NSE Currency Membership"
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/Single+margin+facility.png",
      "year":"2020",
      "title":"Single Margin Facility"
    },
  ]

  ngOnInit(): void {
    this.getPopupData()
    this.getSeoData()
    setTimeout(() => {
      this.pageloader = false
    }, 300);
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

}
