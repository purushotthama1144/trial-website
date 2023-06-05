import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RmsService } from 'src/app/service/rms/rms.service';
import { SeoService } from 'src/app/service/seo/seo.service';

@Component({
  selector: 'app-expiry-contracts',
  templateUrl: './expiry-contracts.component.html',
  styleUrls: ['./expiry-contracts.component.scss'],
  
})
export class ExpiryContractsComponent implements OnInit {

  expirycontract : any;
  constructor(private rmsService : RmsService , private router: Router , private meta: Meta , private seoService: SeoService , private title: Title) { }

  ngOnInit(): void {
    this.getexpiryData()
    this.getSeoData()
  }

  getexpiryData() {
    const data = {
      "rms_calculator_type" : "Expiry Contracts"
    }
    this.rmsService.getRmsliveData(data)
      .subscribe((response: any) => {
      
        this.expirycontract = response
      }, (error) => {
        
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
