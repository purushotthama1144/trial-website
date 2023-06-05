import { Component, HostListener, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';

import { isPlatformBrowser, Location } from '@angular/common';
import { Router, RouterEvent } from '@angular/router';
import { InteractionService } from './service/interaction/interaction.service';
import { NavigationInterceptor } from './interceptors/navigation.interceptor';
import { ScriptService } from './service/script/script.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  lazyLoadHeader:boolean = false;
  hideOpenAccount: boolean = true;
  removeHeaderFooter: boolean = false;
  scrolled: boolean = false;
  
  loader:boolean = true;

  constructor(private router: Router, 
  private navigationInterceptor: NavigationInterceptor,
  private location: Location , 
  private interactionService: InteractionService,
  @Inject(PLATFORM_ID) private platformId: any,) {
    this.location.onUrlChange(x => {
      this.urlChange(x)
    })
    this.router.events.subscribe((e : RouterEvent) => {
      this.navigationInterceptor.navigationInterceptor(e);
    })
  }
  
  urlChange(x) {
    // this.hideOpenAccount = (x == '/business-partner' || x == '/careers' || x == '/antplus2' || x.startsWith('/antiq')) ? false : true;
    this.hideOpenAccount = (x == '/business-partner' || x == '/careers' || x == '/antplus2' ) ? false : true;
    this.removeHeaderFooter = (x == '/antplus2' || x == '/sitemap.xml' || x == '/robots.txt' || x == '/unlock-middleware')
  }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.lazyLoadHeader = true
    }, 200);

    this.interactionService.interactionSelected.subscribe((data) => {
      this.removeHeaderFooter = data;
    });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled = window.scrollY > 600;
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

}
