import { Component, ElementRef, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CalculatorService } from 'src/app/service/calculator/calculator.service';
import { SeoService } from 'src/app/service/seo/seo.service';
declare const $: any;

@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.scss'],
  
})
export class CommodityComponent implements OnInit {
  calculatorData : any
  selectedScripValue:any;
  selectedScripName: string = ""
  lotSize:any;

  /*radio start*/
  selected: string = "1";
  selectedplans: any[] = [
    {
      "name":"Trade Pro (T-Pro) Plan", 
      "value":"1"
    },
    {
      "name":"Freedom 15 (F15) Plan",
      "value":"2"
    }
  ];
  /*radio end*/
  
  constructor(private calculatorService : CalculatorService , 
    private meta: Meta , private seoService: SeoService , private title: Title , private router: Router) { }

  ngOnInit(): void {
    this.getCalculatorData()
    this.getSeoData()
  }
  getCalculatorData() {
    const data = {
      "margin_calculator_type": "Commodity Features"
    }
    this.calculatorService.getCalculatorData(data)
      .subscribe((response: any) => {
        this.calculatorData = response;
        this.selectedScripValue = this.calculatorData[0].lot_size;
        this.selectedScripName = this.calculatorData[0].scrip;
        this.lotSize = this.calculatorData[0].lot_size;
        this.commodityFuture()
      }, (error) => {

      })
  }

  //Commodity Calculation
  gst = 18/100;
  commodityFutureBuy = 50;
  commodityFutureSell = 100;
  commodityFutureQty = 1;
 
  cmdtyFutureBuyTurnover = 0;
  cmdtyFutureSellTurnover = 0;
  cmdtyFutureBrokeragePlan = 1000/10000000;
  cmdtyFuturetxnCharges = 260/10000000;
  cmdtyFutureclearingCharges = 115/10000000;
  cmdtyFutureSebiCharges = 5/10000000;
  cmdtyFutureStampduty = 200/10000000;
  cmdtyFutureCtt = 1000/10000000;

  commodityFutureBrokerage = 0;
  commodityFutureExchangetxn = 0;
  commodityFutureGst = 0;
  commodityFutureCtt = 0;
  commodityFutureClearingcharges = 0;
  commodityFutureSebicharges = 0;
  commodityFutureStampduty = 0;
  commodityFutureTotalcharges = 0;
  commodityFutureTurnover = 0;
  commodityFutureProfitloss = 0;

  commodityFuture(){

    // this.cmdtyFutureBuyTurnover = this.commodityFutureBuy * this.commodityFutureQty * +this.selectedScripValue;
    this.cmdtyFutureBuyTurnover = this.commodityFutureBuy * +this.selectedScripValue;
    // this.cmdtyFutureSellTurnover = this.commodityFutureSell * this.commodityFutureQty * +this.selectedScripValue;
    this.cmdtyFutureSellTurnover = this.commodityFutureSell * +this.selectedScripValue;
    //Turnover
    this.commodityFutureTurnover = this.cmdtyFutureBuyTurnover + this.cmdtyFutureSellTurnover;
    //Brokerage
    this.commodityFutureBrokerage = +(this.commodityFutureTurnover * this.cmdtyFutureBrokeragePlan).toFixed(2);
    //transanction charges
    this.commodityFutureExchangetxn = +(this.commodityFutureTurnover*this.cmdtyFuturetxnCharges).toFixed(2);
    //clearingcharges
    this.commodityFutureClearingcharges = +(this.commodityFutureTurnover*this.cmdtyFutureclearingCharges).toFixed(2);
    //sebi charges
    this.commodityFutureSebicharges = +(this.commodityFutureTurnover*this.cmdtyFutureSebiCharges).toFixed(2);
    //Stamp duty
    this.commodityFutureStampduty = +(this.cmdtyFutureBuyTurnover*this.cmdtyFutureStampduty).toFixed(2);
    // Ctt
    this.commodityFutureCtt = +(this.cmdtyFutureSellTurnover*this.cmdtyFutureCtt).toFixed(2);
    //GST
    this.commodityFutureGst = +((this.commodityFutureBrokerage+this.commodityFutureExchangetxn+this.commodityFutureClearingcharges)*this.gst).toFixed(2);
    //Total Charges
    this.commodityFutureTotalcharges = +(this.commodityFutureBrokerage+this.commodityFutureExchangetxn+this.commodityFutureClearingcharges+this.commodityFutureSebicharges+this.commodityFutureStampduty+this.commodityFutureCtt+this.commodityFutureGst).toFixed(2);
    //Profit/Loss
    this.commodityFutureProfitloss = +(this.cmdtyFutureSellTurnover-this.cmdtyFutureBuyTurnover-this.commodityFutureTotalcharges).toFixed(2);
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
