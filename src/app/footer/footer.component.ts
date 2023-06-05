import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
declare var $: $

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  
})
export class FooterComponent implements OnInit {
  scrolled: boolean = false;
  show: boolean = false;
  referDrop:boolean = false;
  supportDrop:boolean = false;
  educationDrop:boolean = false;
  
  constructor( @Inject(PLATFORM_ID) private platformId: any , private router: Router , ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit(): void {
  }

  @HostListener("window: scroll", [])
  onWindowScroll() { 
    if (isPlatformBrowser(this.platformId)) { 
      this.scrolled = window.scrollY > 400;
    }
  }
  toggleClass() {
    this.show = !this.show
  }
 
}
