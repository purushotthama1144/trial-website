import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { Router, RouterEvent } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PopupComponent } from 'src/app/home/popup/popup.component';
import { AntService } from 'src/app/service/ant/ant.service';
import { FaqService } from 'src/app/service/faq/faq.service';
import { PopupService } from 'src/app/service/popup/popup.service';
import { SeoService } from 'src/app/service/seo/seo.service';

@Component({
  selector: 'app-ant-desk',
  templateUrl: './ant-desk.component.html',
  styleUrls: ['./ant-desk.component.scss'],

})
export class AntDeskComponent implements OnInit {
  isDragging = true;
  config:boolean = false;
  pageloader:boolean = false
  antDeskData : any = {}

  safeSrc: SafeResourceUrl;
  
  faqs:any[] = [];

  customServeOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    // autoplay: true,
    autoplaySpeed: 1000,
    items: 3,
    margin: 30,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    nav: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    responsive: {
      0: {
        items: 1,
        margin: 20
      },
      468: {
        items: 2,
        margin: 20
      },
      768: {
        items: 3
      }
    }
  }

  url = this.router.url;
  popup : any;
  constructor(private sanitizer: DomSanitizer , private faqservice : FaqService , private seoService : SeoService , 
    private meta: Meta , private title: Title , private router: Router ,
    private antService : AntService , private popupservice: PopupService , public dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
    this.getfaq()
    this.getSeoData()
    this.getAntData()
    this.getPopupData()
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

  getAntData() {
    this.pageloader = true
    const data = {
      "ant_type":"ant-desk"
    }
    this.antService.fetchAntData(data).subscribe((response) => {
      this.antDeskData = response[0] == 'No Data'?[]:response;
      setTimeout(() => {
        this.pageloader = false
      }, 300);
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
