import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FaqService } from 'src/app/service/faq/faq.service';
import { SeoService } from 'src/app/service/seo/seo.service';

@Component({
  selector: 'app-lic-ipo',
  templateUrl: './lic-ipo.component.html',
  styleUrls: ['./lic-ipo.component.scss']
})
export class LicIpoComponent implements OnInit {
  faqs:any[] = [];
  config: boolean = false;
  constructor(private router : Router , 
    private faqservice : FaqService , 
    private meta : Meta , 
    private title : Title, 
    private seoService : SeoService) { }

  ngOnInit(): void {
    this.getfaq()
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
    this.meta.addTags([
      // { name: 'title' , content : `LIC IPO - Date, Share Price, News and How to Invest!`},
      { property: 'og:title' , content : 'LIC IPO - Date, Share Price, News and How to Invest!' },
      { name: 'description' , content : `Everything you need to know about the LIC IPO, including the company's background, expected debut date, and pricing, as well as how to invest in LIC IPO.` },
      { property: 'og:description', content : `Everything you need to know about the LIC IPO, including the company's background, expected debut date, and pricing, as well as how to invest in LIC IPO.` },
      { property: 'og:image', content : `https://alicewebsite.s3.ap-south-1.amazonaws.com/cms/uploaded-files/images/admin-cms$ab_cms$1641379007207.png` },
      { property: 'og:image:height', content : `320`},
      { property: 'og:image:width', content : `640` },
      { property: 'og:site_name', content : `Alice Blue` },
      { property: 'og:type', content : `Website` },
      { property: 'og:url', content : `https://aliceblueonline.com` },
      { name: 'twitter:title', content : `LIC IPO - Date, Share Price, News and How to Invest!` },
      { name: 'twitter:card', content : `` },
      { name: 'twitter:site', content : `@aliceblue_india` },
      { name: 'twitter:description', content : `Everything you need to know about the LIC IPO, including the company's background, expected debut date, and pricing, as well as how to invest in LIC IPO.` },
      { name: 'twitter:image', content : `https://alicewebsite.s3.ap-south-1.amazonaws.com/cms/uploaded-files/images/admin-cms$ab_cms$1641379007207.png` },
      { name: 'twitter:creator', content : `@aliceblue_india` },
      { name: 'twitter:url', content : `https://aliceblueonline.com/lic-ipo` },
      { name: 'twitter:type', content : `summary` },
      { name: 'robots:text', content : `follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large` },
    ]);
    this.title.setTitle(`LIC IPO - Date, Share Price, News and How to Invest!`);
    this.seoService.createCanonicalURL();
    
  }

}
