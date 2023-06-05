import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SeoService } from 'src/app/service/seo/seo.service';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.scss'],
  
})
export class FundTransferComponent implements OnInit {
  pageloader:boolean = true
  safeSrc: SafeResourceUrl;

  imageleftTextright ={
    "image": "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/what+is+upi.png",
    "list": [
      "UPI: Alice Blue has introduced UPI Fund transfer so that investors and traders can make their transactions conveniently and more efficiently. As there are many who still do not understand the UPI payment method, keep reading to learn more about the process.",
      "Unified Payments Method is known as UPI. This is a real time interbank payment system. This means that you can transfer money between different banks instantaneously.",
      `<b>Choose Your UPI Payment Mode</b>`
    ],
    "botbutton":"BOT LINK",
    "botLink":"https://play.google.com/store/apps/details?id=com.BOT",
    "webbutton":"WEB LINK",
    "webLink":"http://bo.aliceblueonline.com/WebClient/",
  }
  constructor(private sanitizer: DomSanitizer , private seoService : SeoService , private meta: Meta , private title: Title , private router : Router) { 
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/y_Rkz7jq1Og");
  }

  ngOnInit(): void {
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
}