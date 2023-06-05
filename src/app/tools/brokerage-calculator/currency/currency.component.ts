import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SeoService } from 'src/app/service/seo/seo.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],

})
export class CurrencyComponent implements OnInit {

  /*radio start*/
  selected: string = "1";
  selectedplans: any[] = [
    {
      "name": "Trade Pro (T-Pro) Plan",
      "value": "1"
    },
    {
      "name": "Freedom 15 (F15) Plan",
      "value": "2"
    }
  ];
  /*radio end*/

  constructor(private meta: Meta , private seoService: SeoService , private title: Title , private router: Router) { }

  ngOnInit(): void {
    this.currencyFuture()
    this.currencyOption()
    this.getSeoData()
  }

  gst = 18 / 100;
  //Calculate Currency Future
  currencyFutureBuy = 50;
  currencyFutureSell = 100;
  currencyFutureQty = 10;

  currencyFtrBuyTurnover = 0;
  currencyFtrSellTurnover = 0;
  currencyFtrBrokeragePlan = 10;
  currencyFtrtxnCharges = 260 / 10000000;
  currencyFtrclearingCharges = 200 / 10000000;
  currencyFtrSebiCharges = 5 / 10000000;
  currencyFtrStampduty = 10 / 10000000;
  currencyFtrStt = 0;

  currencyFutureBrokerage = 0;
  currencyFutureExchangetxn = 0;
  currencyFutureGst = 0;
  currencyFutureStt = 0;
  currencyFutureClearingcharges = 0;
  currencyFutureSebicharges = 0;
  currencyFutureStampduty = 0;
  currencyFutureTotalcharges = 0;
  currencyFutureTurnover = 0;
  currencyFutureProfitloss = 0;

  currencyFuture() {
    this.currencyFtrBuyTurnover = this.currencyFutureBuy * this.currencyFutureQty;
    this.currencyFtrSellTurnover = this.currencyFutureSell * this.currencyFutureQty;
    //Turn Over
    this.currencyFutureTurnover = this.currencyFtrBuyTurnover + this.currencyFtrSellTurnover;
    //Brokerage
    this.currencyFutureBrokerage = this.currencyFtrBrokeragePlan * this.currencyFutureQty;
    //transanction charges
    this.currencyFutureExchangetxn = +(this.currencyFutureTurnover * this.currencyFtrtxnCharges).toFixed(2);
    //clearingcharges
    this.currencyFutureClearingcharges = +(this.currencyFutureTurnover * this.currencyFtrclearingCharges).toFixed(2);
    //sebi charges
    this.currencyFutureSebicharges = +(this.currencyFutureTurnover * this.currencyFtrSebiCharges).toFixed(2);
    //Stamp duty
    this.currencyFutureStampduty = +(this.currencyFtrBuyTurnover * this.currencyFtrStampduty).toFixed(2);
    // STT
    this.currencyFutureStt = 0;
    //GST
    this.currencyFutureGst = +((this.currencyFutureBrokerage + this.currencyFutureExchangetxn + this.currencyFutureClearingcharges) * this.gst).toFixed(2);
    //Total Charges
    this.currencyFutureTotalcharges = +(this.currencyFutureBrokerage + this.currencyFutureExchangetxn + this.currencyFutureClearingcharges + this.currencyFutureSebicharges + this.currencyFtrStampduty + this.currencyFutureStt + this.currencyFutureGst).toFixed(2);
    // Profit Loss
    this.currencyFutureProfitloss = +(this.currencyFtrSellTurnover - this.currencyFtrBuyTurnover - this.currencyFutureTotalcharges).toFixed(2);
  }

  //Currenct Options
  currencyOptionBuy = 50;
  currencyOptionSell = 100;
  currencyOptionQty = 10;
  currencyOptionLot = 1;

  currencyOpBuyTurnover = 0;
  currencyOpSellTurnover = 0;
  currencyOpBrokeragePlan = 10;
  currencyOptxnCharges = 260 / 10000000;
  currencyOpclearingCharges = 3000 / 10000000;
  currencyOpSebiCharges = 5 / 10000000;
  currencyOpStampduty = 10 / 10000000;
  currencyOpStt = 0;

  currencyOptionBrokerage = 0;
  currencyOptionExchangetxn = 0;
  currencyOptionGst = 0;
  currencyOptionStt = 0;
  currencyOptionClearingcharges = 0;
  currencyOptionSebicharges = 0;
  currencyOptionStampduty = 0;
  currencyOptionTotalcharges = 0;
  currencyOptionTurnover = 0;
  currencyOptionProfitloss = 0;

  currencyOption() {
    this.currencyOpBuyTurnover = this.currencyOptionBuy * this.currencyOptionQty;
    this.currencyOpSellTurnover = this.currencyOptionSell * this.currencyOptionQty;
    //Turn over
    this.currencyOptionTurnover = this.currencyOpBuyTurnover + this.currencyOpSellTurnover;
    //Brokerage
    this.currencyOptionBrokerage = this.currencyOpBrokeragePlan * this.currencyOptionQty;
    //transanction charges
    this.currencyOptionExchangetxn = +(this.currencyOptionTurnover * this.currencyOptxnCharges).toFixed(2);
    //clearingcharges
    this.currencyOptionClearingcharges = +(this.currencyOptionTurnover * this.currencyOpclearingCharges).toFixed(2);
    //sebi charges
    this.currencyOptionSebicharges = +(this.currencyOptionTurnover * this.currencyOpSebiCharges).toFixed(2);
    //Stamp duty
    this.currencyOptionStampduty = +(this.currencyOpBuyTurnover * this.currencyOpStampduty).toFixed(2);
    // STT
    this.currencyOptionStt = 0;
    //GST
    this.currencyOptionGst = +((this.currencyOptionBrokerage + this.currencyOptionExchangetxn + this.currencyOptionClearingcharges) * this.gst).toFixed(2);
    //Total Charges
    this.currencyOptionTotalcharges = +(this.currencyOptionBrokerage + this.currencyOptionExchangetxn + this.currencyOptionClearingcharges + this.currencyOptionSebicharges + this.currencyOptionStampduty + this.currencyOptionStt + this.currencyOptionGst).toFixed(2);
    // Profit Loss
    this.currencyOptionProfitloss = +(this.currencyOpSellTurnover - this.currencyOpBuyTurnover - this.currencyOptionTotalcharges).toFixed(2);
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
