import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-margin-calculator',
  templateUrl: './margin-calculator.component.html',
  styleUrls: ['./margin-calculator.component.scss'],
  
})
export class MarginCalculatorComponent implements OnInit {

  navLinks: any[];
  constructor(private router: Router , @Inject(PLATFORM_ID) private platformId: any,) {
    // this.navLinks = [
      // {
      //   label: 'Commodity Futures',
      //   link: './commodity',
      //   index: 0
      // }, 
      // {
      //   label: 'Index & Equity Future',
      //   link: './futures',
      //   index: 1
      // }, 
      // {
      //   label: 'Equity',
      //   link: './equity',
      //   index: 0
      // },   
      // {
      //   label: 'Currency',
      //   link: './currency',
      //   index: 3
      // },
      // {
      //   label: 'Options Calculator',
      //   link: './nifty-and-bank-nifty',
      //   index: 4
      // },
    // ];
  }

  

  ngOnInit(): void {
    // console.log(siteUrl)
  }

  openHref(siteUrl){
    if (isPlatformBrowser(this.platformId)) {
      window.open(siteUrl, '_blank');
    }
    
  }
}
