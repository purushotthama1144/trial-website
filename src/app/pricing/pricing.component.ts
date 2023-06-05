import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PopupComponent } from '../home/popup/popup.component';
import { FaqService } from '../service/faq/faq.service';
import { PopupService } from '../service/popup/popup.service';
import { PricingService } from '../service/pricing/pricing.service';
import { SeoService } from '../service/seo/seo.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  
})
export class PricingComponent implements OnInit {
  pricingData:any
  pageloader: boolean = true
  url = this.router.url
  popup : any ;

  exposuref20Plan:any[] = []

  f15PlanBrokerage:any[] = []
  f15PlanMargin:any[] = []
  tradeProBrokerage:any[] = []
  tradeProMargin:any[] = []
  pricingDetails: any[]=[];
  faqs: any[] = [];
  config: boolean = false;

  constructor(private popupservice :PopupService , public dialog: MatDialog , private router: Router , private faqservice: FaqService, private pricingservice: PricingService, private meta: Meta, private title: Title, private seoService : SeoService ) { }
  
  ngOnInit(): void {
    this.getfaq()
    this.getF15Data()
    this.getTradeproData()
    this.getPopupData()
    this.getPageData()
    this.getSeoData()
  }

  toggle(index: number) {
    if (!this.config) {
      this.faqs.filter((menu, i) => i !== index && menu.active).forEach((menu) => (menu.active = !menu.active));
    }
    this.faqs[index].active = !this.faqs[index].active;
  }

  getfaq() {
    const data = {
      "page_url": this.router.url
    }
    this.faqservice.fetchsinglePagefaq(data).subscribe((response: any) => {
      this.faqs = response[0] == 'No Data' ? [] : response;
    }, (error) => {
      console.log(error)
    })
  }

  split(plan) {
    return plan.split(';')
  }

  getPageData() {
    this.pricingservice.fetchtPageData().subscribe((response) => {
      this.pricingData = response
      setTimeout(() => {
        this.pageloader = false
      }, 300);
      this.pricingDetails = [
        {
          "price": `${this.pricingData.block_one}`,
          "title": "Stocks",
          "desc": "Invest in equity delivery free of charge"
        },
        {
          "price": `${this.pricingData.block_two}`,
          "title": "Mutual Funds & IPOs",
          "desc": "Invest in commission free MFs"
        },
        {
          "price": `${this.pricingData.block_three}`,
          "title": "All Segments",
          "desc": "Freedom 15 plan for all Intraday & F&O, Currencies & Commodity Orders"
        },
      ]
    } , (error) => {
      console.log(error)
    })
  }

  getF15Data() {
    const data = {
      "plan_type": "F15"
    }
    this.pricingservice.fetchtPricingData(data).subscribe((response) => {
      this.f15PlanBrokerage = response["Brokerage Details"];
      this.f15PlanMargin = response["Margin Details"];
    }, (error) => {
      console.log(error)
    })
  }

  getTradeproData() {
    const data = {
      "plan_type": "Trade"
    }
    this.pricingservice.fetchtPricingData(data).subscribe((response) => {
      this.tradeProBrokerage = response["Brokerage Details"];
      this.tradeProMargin = response["Margin Details"];
    }, (error) => {
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

  getSeoData() {
    const data = {
      "page_url": `https://aliceblueonline.com${this.router.url}` 
    }
    this.seoService.createCanonicalURL();
    this.seoService.fetchSeoData(data).subscribe((response) => {
    this.meta.addTags([
      {name: 'title' , content : response.meta_title },
      {property: 'og:title' , content : response.og_title },
      {name: 'description' , content : response.meta_desc },
      { property: 'og:description', content: response.og_desc },
      { property: 'og:image', content: response.og_image },
      { property: 'og:image:height', content: response.og_image_height },
      { property: 'og:image:width', content: response.og_image_width },
      { property: 'og:site_name', content: response.og_site },
      { property: 'og:type', content: response.og_type },
      { property: 'og:url', content: response.og_url },
      { name: 'twitter:title', content: response.twitter_title },
      { name: 'twitter:card', content: response.twitter_type },
      { name: 'twitter:site', content: response.twitter_site },
      { name: 'twitter:description', content: response.twitter_description },
      { name: 'twitter:image', content: response.twitter_image },
      { name: 'twitter:creator', content: response.twitter_handle },
      { name: 'twitter:url', content: response.twitter_url },
    ]);
    this.title.setTitle(response.title);
    } , (error) => {
      console.log(error)
    })
  }
}
