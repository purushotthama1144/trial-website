import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, Meta, SafeHtml, SafeResourceUrl, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PopupComponent } from '../home/popup/popup.component';
import { PopupService } from '../service/popup/popup.service';
import { SeoService } from '../service/seo/seo.service';

@Component({
  selector: 'app-tradelink',
  templateUrl: './tradelink.component.html',
  styleUrls: ['./tradelink.component.scss'],
  
})
export class TradelinkComponent implements OnInit {

  safeSrc: SafeResourceUrl;
  pageloader:boolean = true

  howWorks = [
    {
      "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Trade+Link/Icons/order-generator.png",
      "desc":"Convert Idea into a Trade with Order Generator."
    },
    {
      "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Trade+Link/Icons/share-link-with-traders.png",
      "desc":"Generate & Share Link with fellow traders."
    },
    {
      "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Trade+Link/Icons/single-click.png",
      "desc":"Fellow Traders can Execute Pre-filled Order in a Single Click."
    },
  ]

  whyTradelink = [
    {
      "title":"Easy",
      "desc":"Fill . Generate . Share"
    },
    {
      "title":"Convenient",
      "desc":"Order is prefilled with details"
    },
    {
      "title":"Quick",
      "desc":"Place orders in a single click"
    },
  ]

  content = [
    "Do you share Trading Ideas with your clients via Telegram or Whatsapp?<br>Isn't it difficult for your clients to remember the call, enter the order details, and finally take the trade?<br>Very time-consuming and might result in Loss of Opportunity!<br>Not Anymore!<br>With Trade Link, don’t just share your trading idea, share a Link containing prefilled order details to help your clients trade in a single click."
    
  ]
  popup: any;


  
  constructor(private sanitizer: DomSanitizer , private router: Router ,
     private meta: Meta , private popupservice : PopupService , public dialog: MatDialog,
     private seoService: SeoService , private title: Title) { 
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/wAI2WbghgKc");
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageloader = false
    }, 300);
    this.getPopupData()
    this.getSeoData()
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


  getPopupData() {
    const data =  {
      "page_url":this.router.url == '/'?'/':this.router.url
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
