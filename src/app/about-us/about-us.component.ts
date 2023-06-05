import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

import * as $ from 'jquery';
import { SeoService } from '../service/seo/seo.service';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PopupService } from '../service/popup/popup.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../home/popup/popup.component';

declare var $: $


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],

})
export class AboutUsComponent implements OnInit {
  pageloader:boolean = true
  imgrtxtlAliceblue = {
    header: "We are Alice Blue",
    alt:"Alice Blue Company",
    image: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/journey-started-aliceblue.png",
    content: "We are Alice Blue. We started in 2014 and have grown with the support of our clients, partners and employees. It's been an intense journey to becoming better and serving our clients best. A journey filled with learning, experiences, rewards and relationships. As we stand today, we are proud to be South India's largest stock broker serving over 1 lakh clients. We operate from 15 branches all across the country. We manage over 7000 crore worth of trades every day.",
    subCont: "We are evolving…for Better. Everyday. We want to be trusted and adorned by our clients. We wish to be No.1 Stock Broker in the country. We aspire to be the best for our clients. This is what we are working towards and we are quite relentless in achieving our Vision."
  }

  imgrtxtlVision = {
    header: "Vision",
    alt:"Alice Blue - Our Vision",
    image: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/our-vision-aliceblue.png",
    content: "Our Vision is to be the Best Customer Preferred Financial Enabler.",
    additionalCont: "Our core value is <b>Trust and Transparency</b>. We believe in creating experiences and value to sustain growth for our clients. We work hard to onboard and retain our clients. At Alice Blue, we work toward retaining our clients and expanding their portfolios."
  }
  url = this.router.url;
  popup : any;

  isDragging: boolean = false;
  // People Serving SLider start
  customServeOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    autoplay: true,
    autoplaySpeed: 1000,
    items: 1,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    nav: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut'
  }
  carouselData = [
    "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/core-team-aliceblue.JPG",
    "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/core-team-member-aliceblue.JPG"
  ]
  // People Serving SLider End
  //Product slider Start
  customProductOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    // autoplay: true,
    autoplaySpeed: 1000,
    items: 2,
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
        items: 2
      }
    }
  }
  productData = [
    "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/ant-mobi.png",
    "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/ant-web.png" ,
    "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/tradeschool.png" ,
    "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/tradestore.png"
  ]
  // Product slider End
  processData = [
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/ekyc-login.png",
      header: "Open an Account",
      link: "https://ekyc.aliceblueonline.com/"
    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/bot.png",
      header: "ANT Dashboard",
      link: "https://bot.aliceblueonline.com"
    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/partner-dashboard.png",
      header: "Partner Dashboard",
      link: "https://partners.aliceblueonline.com/Login"
    },
  ]
  //Process slider End
  paradigmData = [
    "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/f15-brokerage-plan-aliceblue.png",
    "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/equity-sip.png"
  ]
  //Paradigm slider End
  //directors details

  directors_name = [
    {
      name:`<h2>SIDHA <br> VELAYUTHAM</h2>`,
      alt:"SIDHA VELAYUTHAM - ALICE BLUE - Founder & CEO",
      titleUrl: "sidha-velayutham",
    },
    {
      name:`<h2>RAJESH <br> KANAKAVEL</h2>`,
      alt:"RAJESH KANAKAVEL - DIRECTOR- EQUITY",
      titleUrl: "rajesh-kanakavel",
    },
    // {
    //   name:`<h2>MUTHURAJ <br> PRABHU.R</h2>`,
    //   alt:"MUTHURAJ PRABHU.R - DIRECTOR - COMMODITY",
    //   titleUrl: "muthuraj-prabhu",
    // },
  ]

  directors = [
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/sidha.jpg",
      title: "SIDHA VELAYUTHAM",
      titleUrl: "sidha-velayutham",
      designation: "Founder & CEO",
      linkdIn: "https://www.linkedin.com/in/sidhavelayutham-mohan-20981739/"
    },
    {
      img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/rajesh.jpg",
      title: "RAJESH KANAKAVEL",
      titleUrl: "rajesh-kanakavel",
      designation: "Director - Commodity",
      linkdIn: "https://www.linkedin.com/in/rajesh-k-6553ab111"
    },
    // {
    //   img: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/About+us+/muthuraj.jpg",
    //   title: "MUTHURAJ PRABHU.R",
    //   titleUrl: "muthuraj-prabhu",
    //   designation: "Director - Equity",
    //   linkdIn: "https://www.linkedin.com/in/muthurajprabhu/"
    // },
  ]
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
      img:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/MCX+Membership.png",
      "year":"2007",
      title:"MCX Membership"
    },
    {
      img:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/NSE+Membership.png",
      "year":"2008",
      title:"NSE Membership"
    },
    {
      img:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/NCDEX+Membership.png",
      "year":"2009",
      title:"NCDEX Membership"
    },
    {
      img:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/MCZX+n+NSE+Membership.png",
      "year":"2012",
      title:"MCX-SX and NSE (EQ&FO) Membership"
    },
    {
      img:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/BSE+EQ+and+FO+Membership.png",
      "year":"2014",
      title:"BSE EQ&FO Membership"
    },
    {
      img:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/CDSL+Membership.png",
      "year":"2015",
      title:"CDSL Membership"
    },
    {
      img:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/Branch+Expansion.png",
      "year":"2016",
      title:"Branch expansion from 5 to 15 across India"
    },
    {
      img:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/NSE+currencies.png",
      "year":"2019",
      title:"NSE Currency Membership"
    },
    {
      img:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/achievement/Single+margin+facility.png",
      "year":"2020",
      title:"Single Margin Facility"
    },
  ]

  constructor(private seoService : SeoService , private meta: Meta , private title: Title, private router: Router , public dialog: MatDialog , private popupservice: PopupService ,) { }


  ngOnInit(): void {
    setTimeout(() => {
      this.pageloader = false
    }, 300);
    this.getPopupData()
    this.getSeoData()
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
