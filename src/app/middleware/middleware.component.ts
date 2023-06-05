import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../service/blog/blog.service';
import { InteractionService } from '../service/interaction/interaction.service';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import * as $ from 'jquery';
import { FaqService } from '../service/faq/faq.service';
import { SeoService } from '../service/seo/seo.service';
declare var $: $

@Component({
  selector: 'app-middleware',
  templateUrl: './middleware.component.html',
  styleUrls: ['./middleware.component.scss'],
  
})

export class MiddlewareComponent implements OnInit {
  blogData: any;
  scrolled: boolean = false;
  pageloader: boolean = false;
  faqs:any[] = [];
  config: boolean = false;
  url: string = "";
  blog: boolean = false;
  constructor(private blogService: BlogService,
    private meta: Meta,
    private title: Title,
    private interactionService: InteractionService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router ,
    private faqservice : FaqService , private seoService : SeoService) {}

  ngOnInit(): void {
    this.getfaq()
    this.getSpecificBlog();
    this.getSeoData()
    if (isPlatformBrowser(this.platformId)) { 
      setTimeout(function(){
        $( ".e-rte-table" ).wrap( "<div class='table-outer'></div>" );
      } , 1500)
    }
  }

  getSpecificBlog() {
    this.pageloader = true
    if (isPlatformBrowser(this.platformId)) {
      const data = {
        "redirect_url": this.router.url.split('/')[1]
      }
      this.blogService.getRedirectData(data)
        .subscribe((response: any[]) => {
          this.pageloader = false;
          let obj = response.find(o => o.original_url == this.router.url);
          if (typeof obj != 'undefined') {
            this.interactionService.interactionSelected.emit(true);
            this.blog = false;
            window.open(obj.redirected_url, "_self")
          }
          else {
            this.blogService.getSpecificBlog(data)
              .subscribe((responseBlog: any) => {
                if (responseBlog.redirect_url) {
                  this.interactionService.interactionSelected.emit(true);
                  this.blog = false;
                  // window.open(`https://old.aliceblueonline.com${this.router.url}`, "_self")
                  this.router.navigate(['/page-not-found'])
                }
                else {
                  this.interactionService.interactionSelected.emit(false);
                  this.blog = true;
                  this.blogData = responseBlog;
                }
              }, (error) => {
                console.log(error)
              })
          }
        }, (error) => {
          console.log(error)
          this.pageloader = false;
        })
    }
  }

  toggle(index: number) {
    if (!this.config) {
      this.faqs.filter((menu, i) => i !== index && menu.active).forEach((menu) => (menu.active = !menu.active));
    }
    this.faqs[index].active = !this.faqs[index].active;
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

  @HostListener("window: scroll", [])

  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled = window.scrollY > 520;
    }
  }
}
