import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { LoginComponent } from '../unlock/login/login.component';
declare var $: $

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  scrolled: boolean = false;
  toggleMenu: boolean = false;
  showFiller = false;

  menuItems = [
    {
      "title":"Tools",
      "link":"/margin-calculator",
      "subMenu":[
        {
          "title":"Margin Calculator",
          "link":"/margin-calculator",       
        },
        {
          "title":"Brokerage Calculator",
          "link":"/brokerage-calculator/equity",       
        },
        // {
        //   "title":"Option Calculator",
        //   "link":"/margin-calculator/nifty-and-bank-nifty",       
        // },
        {
          "title":"Pivot Points",
          "link":"/pivot-points",       
        },
        {
          "title":"RMS Live",
          "link":"/rms-live-updates",       
        },
        {
          "title":"Trade Link",
          "link":"/trade-link",       
        },
        // {
        //   "title":"WhatsApp Reports",
        //   "link":"/",       
        // },
      ]
    },    
    {
      "title":"ANT",
      "link":"/ant",
      "subMenu":[
        {
          "title":"ANT Mobi",
          "link":"/ant-mobi",       
        },
        {
          "title":"ANT Web",
          "link":"/ant-web",       
        },
        // {
        //   "title":"ANT Desk",
        //   "link":"/ant-desk",       
        // },
        {
          "title":"ANT Plus",
          "link":"/ant-plus",       
        },
        
      ]
    },
    {
      "title":"Pricing",
      "link":"/pricing"
    },
    {
      "title":"Open Account",
      "link":"/open-account-fill-kyc-request-call-back"
    },
    {
      "title":"Partner with Us",
      "link":"/business-partner"
    },
    {
      "title":"Aspiring Investor Program",
      "link":"/aspiring-investor-program"
    },
    {
      "title":"Refer",
      "link":"/refer-us"
    },
    {
      "title":"Unlock",
      "link":"/unlock"
    },
    
  ]
  
  pushMenu = [
    {
      "title":"Trading Platform",
      "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Homepage+/ant.webp",
      "link":"https://ant.aliceblueonline.com/"
    },
    {
      "title":"Backoffice",
      "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Homepage+/bot.webp",
      "link":"https://bot.aliceblueonline.com/"
    },
    // {
    //   "title":"Beta Trading Platform",
    //   "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/svg/ant.png",
    //   "link":"https://ant-beta.aliceblueonline.com"
    // },
    {
      "title":"Mutual Funds Platform",
      "icon":"https://aliceblue-mutual-funds.s3.ap-south-1.amazonaws.com/website/images/alice2.svg",
      "link":"https://mutualfunds.aliceblueonline.com/"
    },
    {
      "title":"Digilink Partner Dashboard",
      "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Homepage+/partner.webp",
      "link":"https://partners.aliceblueonline.com/Login"
    },
  ]

  redirectMenus = [
    {
      "icon" :"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Homepage+/tradestore.webp",
      "title":"Trade Store",
      "link":"https://tradestore.aliceblueonline.com/",
    },
    {
      "icon" :"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Homepage+/tradeschool.webp",
      "title":"Trade School",
      "link":"https://tradeschool.aliceblueonline.com/",
    },
  ]
  
  landing_pageUrls = [
    // {
    //   url : "lic-ipo",
    //   title : "Lic IPO"
    // }
  ]

  constructor(public router:Router , private dialog : MatDialog, @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {
  }

  clickEvent(){
    this.toggleMenu = !this.toggleMenu;       
  }
  removeClass(){
    this.toggleMenu = !this.toggleMenu; 
  }
  closePushmenu(){
    this.toggleMenu = false
  }

  openLogin() {
    this.dialog.open(LoginComponent, {
      disableClose: true,
      width: '400px',
    });
  }

  openDesktopMenu() {
    
  }
  openMobileMenu() {

  }
  

  @HostListener("window: scroll", [])
  onWindowScroll() { 
    if (isPlatformBrowser(this.platformId)) { 
      this.scrolled = window.scrollY > 150;
    }
  }
}
