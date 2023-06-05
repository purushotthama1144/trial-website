import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CircularsService } from 'src/app/service/circulars/circulars.service';
import * as $ from 'jquery';
import { CircularTCComponent } from '../circular-detail/t-c/t-c.component';
import { MatDialog } from '@angular/material/dialog';
import { SeoService } from 'src/app/service/seo/seo.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
declare var $: $

@Component({
  selector: 'app-circular-detail',
  templateUrl: './circular-detail.component.html',
  styleUrls: ['./circular-detail.component.scss'],
  
})
export class CircularDetailComponent implements OnInit {
  scrolled: boolean = false;
  pageloader : boolean = false;
  element:any;
  category: any;
  url: any;
  safeSrc: any;

  constructor(private circularsService : CircularsService , 
    @Inject(PLATFORM_ID) private platformId: any, 
    private route: ActivatedRoute , private sanitizer: DomSanitizer , private dialog : MatDialog , private router: Router , private meta: Meta , private title: Title , private seoService : SeoService) { 
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/wAI2WbghgKc");
  }

  ngOnInit(): void {
    this.getSeoData()
    this.route.params.subscribe(
      params => {
        this.category = params['category']
        this.url = params['url']
        this.getspecificCircular()
      })
  }

  openDialog(element: any) {
    const dialogRef = this.dialog.open(CircularTCComponent,{
      data:{
        element
      },
      disableClose: true,  
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  @HostListener("window: scroll", [])

  onWindowScroll() { 
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled = window.scrollY > 220;
    }
  }

  getspecificCircular() {
    this.pageloader = true
    const data = {
      "circular_url": `${this.category}/${this.url}`
    }
    this.circularsService.fetchspecificCircular(data).subscribe((response) => {
      this.element = response[0] == "No Data"?null:response;
      this.pageloader = false
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
}
