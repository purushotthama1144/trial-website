import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SeoService } from 'src/app/service/seo/seo.service';

@Component({
  selector: 'app-equity',
  templateUrl: './equity.component.html',
  styleUrls: ['./equity.component.scss'],
  
})
export class EquityComponent implements OnInit {

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
  tradePro = "";
  freedom = "";

  gst = 18/100;

  constructor(private meta: Meta , private seoService: SeoService , private title: Title , private router: Router) { }

  ngOnInit(): void {
    this.onRadioChange()
    this.intradayEquity()
    this.deliveryEquity()
    this.fnoFuture()
    this.fnoOption()
    this.getSeoData()
  }
 
  onRadioChange(){
    if(this.selected == "1"){
      this.tradePro = "0.01"
    }
    else if (this.selected == "2"){
      this.freedom = "0.001"
    }
  }
  //Calculation Intraday Equity
  // Intraday Equity
  intradayEquityBuy = 50;
  intradayEquitySell = 100;
  intradayEquityQty = 10;
  intradayBuyTurnover = 0;
  intradaySellTurnover = 0;
  intradayBrokeragePlan = 1000/10000000;
  intradaytxnCharges = 0.00345/100;
  intradayclearingCharges = 100/10000000;
  intradaySebiCharges = 5/10000000;
  intradayStampduty = 300/10000000;
  intradayStt = 0.025/100;

  intradayEquityBrokerage = 0;
  intradayEquityExchangetxn = 0;
  intradayEquityGst = 0;
  intradayEquityStt = 0;
  intradayEquityClearingcharges = 0;
  intradayEquitySebicharges = 0;
  intradayEquityStampduty = 0;
  intradayEquityTotalcharges = 0;
  intradayEquityTurnover = 0;
  intradayEquityProfitloss = 0;

  intradayEquity(){
    this.intradayBuyTurnover = this.intradayEquityBuy*this.intradayEquityQty;
    this.intradaySellTurnover = this.intradayEquitySell*this.intradayEquityQty;
    //Turnover
    this.intradayEquityTurnover = this.intradayBuyTurnover+this.intradaySellTurnover;
    //Brokerage
    this.intradayEquityBrokerage = +(this.intradayEquityTurnover*this.intradayBrokeragePlan).toFixed(2);
    //transanction charges
    this.intradayEquityExchangetxn = +(this.intradayEquityTurnover*this.intradaytxnCharges).toFixed(2);
    //clearingcharges
    this.intradayEquityClearingcharges = +(this.intradayEquityTurnover*this.intradayclearingCharges).toFixed(2);
    //sebi charges
    this.intradayEquitySebicharges = +(this.intradayEquityTurnover*this.intradaySebiCharges).toFixed(2);
    //Stamp duty
    this.intradayEquityStampduty = +(this.intradayBuyTurnover*this.intradayStampduty).toFixed(2);
    // STT
    this.intradayEquityStt = +(this.intradaySellTurnover*this.intradayStt).toFixed(2);
    //GST
    this.intradayEquityGst = +((this.intradayEquityBrokerage+this.intradayEquityExchangetxn+this.intradayEquityClearingcharges)*this.gst).toFixed(2);
    //Total Charges
    this.intradayEquityTotalcharges = +(this.intradayEquityBrokerage+this.intradayEquityExchangetxn+this.intradayEquityClearingcharges+this.intradayEquitySebicharges+this.intradayEquityStampduty+this.intradayEquityStt+this.intradayEquityGst).toFixed(2);
    //Profit/Loss
    this.intradayEquityProfitloss = +(this.intradaySellTurnover-this.intradayBuyTurnover-this.intradayEquityTotalcharges).toFixed(2);
  }

  //Calculation Delivery Equity
  // Delivery Equity
  deliveryEquityBuy = 50;
  deliveryEquitySell = 100;
  deliveryEquityQty = 10;
  deliveryBuyTurnover = 0;
  deliverySellTurnover = 0;
  deliveryBrokeragePlan = 10000/10000000;
  deliverytxnCharges = 0.00345/100;
  deliveryclearingCharges = 100/10000000;
  deliverySebiCharges = 5/10000000;
  deliveryStampduty = 1500/10000000;
  deliveryStt = 0.10/100;

  deliveryEquityBrokerage =  0;
  deliveryEquityExchangetxn = 0;
  deliveryEquityGst = 0;
  deliveryEquityStt = 0;
  deliveryEquityClearingcharges = 0;
  deliveryEquitySebicharges = 0;
  deliveryEquityStampduty = 0;
  deliveryEquityTotalcharges = 0;
  deliveryEquityTurnover = 0;
  deliveryEquityProfitloss = 0;

  deliveryEquity(){
    this.deliveryBuyTurnover = this.deliveryEquityBuy*this.deliveryEquityQty;
    this.deliverySellTurnover = this.deliveryEquitySell*this.deliveryEquityQty;
    //Turnover
    this.deliveryEquityTurnover = this.deliveryBuyTurnover+this.deliverySellTurnover;
    //Brokerage
    this.deliveryEquityBrokerage = +(this.deliveryEquityTurnover*this.deliveryBrokeragePlan).toFixed(2);
    //transanction charges
    this.deliveryEquityExchangetxn = +(this.deliveryEquityTurnover*this.deliverytxnCharges).toFixed(2);
    //clearingcharges
    this.deliveryEquityClearingcharges = +(this.deliveryEquityTurnover*this.deliveryclearingCharges).toFixed(2);
    //sebi charges
    this.deliveryEquitySebicharges = +(this.deliveryEquityTurnover*this.deliverySebiCharges).toFixed(2);
    //Stamp duty
    this.deliveryEquityStampduty = +(this.deliveryBuyTurnover*this.deliveryStampduty).toFixed(2);
    // STT
    this.deliveryEquityStt = +(this.deliverySellTurnover*this.deliveryStt).toFixed(2);
    //GST
    this.deliveryEquityGst = +((this.deliveryEquityBrokerage+this.deliveryEquityExchangetxn+this.deliveryEquityClearingcharges)*this.gst).toFixed(2);
    //Total Charges
    this.deliveryEquityTotalcharges = +(this.deliveryEquityBrokerage+this.deliveryEquityExchangetxn+this.deliveryEquityClearingcharges+this.deliveryEquitySebicharges+this.deliveryEquityStampduty+this.deliveryEquityStt+this.intradayEquityGst).toFixed(2);
    //Profit/Loss
    this.deliveryEquityProfitloss = +(this.deliverySellTurnover-this.deliveryBuyTurnover-this.deliveryEquityTotalcharges).toFixed(2);
  }

  //Calculation FNO Future
  // FNO Futures
  fnoFutureBuy = 50;
  fnoFutureSell = 100;
  fnoFutureQty = 10;
  fnoTurnover = 0;
  fnoFutureBuyTurnover = 0;
  fnoFutureSellTurnover = 0;
  fnoFutureBrokeragePlan = 1000/10000000;
  fnoFuturetxnCharges = 0.002/100;
  fnoclearingCharges = 115/10000000;
  fnoSebiCharges = 5/10000000;
  fnoStampduty = 200/10000000;
  fnoStt = 0.01/100;

  fnoFutureBrokerage =  0;
  fnoFutureExchangetxn = 0;
  fnoFutureGst = 0;
  fnoFutureStt = 0;
  fnoFutureClearingcharges = 0;
  fnoFutureSebicharges = 0;
  fnoFutureStampduty = 0;
  fnoFutureTotalcharges = 0;
  fnoFutureTurnover = 0;
  fnoFutureProfitloss = 0;

  fnoFuture(){
    this.fnoFutureBuyTurnover = this.fnoFutureBuy*this.fnoFutureQty;
    this.fnoFutureSellTurnover  = this.fnoFutureSell*this.fnoFutureQty;
    //Turnover
    this.fnoFutureTurnover = this.fnoFutureBuyTurnover+this.fnoFutureSellTurnover;
    //Brokerage
    this.fnoFutureBrokerage = +(this.fnoFutureTurnover*this.fnoFutureBrokeragePlan).toFixed(2);
    //transanction charges
    this.fnoFutureExchangetxn = +(this.fnoFutureTurnover*this.fnoFuturetxnCharges).toFixed(2);
    //clearingcharges
    this.fnoFutureClearingcharges = +(this.fnoFutureTurnover*this.fnoclearingCharges).toFixed(2);
    //sebi charges
    this.fnoFutureSebicharges = +(this.fnoFutureTurnover*this.fnoSebiCharges).toFixed(2);
    //Stamp duty
    this.fnoFutureStampduty = +(this.fnoFutureBuyTurnover*this.fnoStampduty).toFixed(2);
     // STT
     this.fnoFutureStt = +(this.fnoFutureSellTurnover*this.fnoStt).toFixed(2);
     //GST
     this.fnoFutureGst = +((this.fnoFutureBrokerage+this.fnoFutureExchangetxn+this.fnoFutureClearingcharges)*this.gst).toFixed(2);
     //Total Charges
    this.fnoFutureTotalcharges = +(this.fnoFutureBrokerage+this.fnoFutureExchangetxn+this.fnoFutureClearingcharges+this.fnoFutureSebicharges+this.deliveryEquityStampduty+this.fnoFutureStt+this.fnoFutureGst).toFixed(2);
    //Profit/Loss
    this.fnoFutureProfitloss = +(this.fnoFutureSellTurnover-this.fnoFutureBuyTurnover-this.fnoFutureTotalcharges).toFixed(2);
  }

  //Calculation FNO Option
  // FNO Options  
  fnoOptionBuy = 50;
  fnoOptionSell = 100;
  fnoOptionQty = 10;
  fnoOpTurnover = 0;
  fnoOptionBuyTurnover = 0;
  fnoOptionSellTurnover = 0;
  fnoOptionBrokeragePlan = 20;
  fnoOptiontxnCharges = 0.053/100;
  fnoOpclearingCharges = 3000/10000000;
  fnoOpSebiCharges = 5/10000000;
  fnoOpStampduty =  300/10000000;
  fnoOpStt = 0.05/100;

  fnoOptionBrokerage =  0;
  fnoOptionExchangetxn = 0;
  fnoOptionGst = 0;
  fnoOptionStt = 0;
  fnoOptionClearingcharges = 0;
  fnoOptionSebicharges = 0;
  fnoOptionStampduty = 0;
  fnoOptionTotalcharges = 0;
  fnoOptionTurnover = 0;
  fnoOptionProfitloss = 0;

  fnoOption(){
    this.fnoOptionBuyTurnover = this.fnoOptionBuy*this.fnoOptionQty;
    this.fnoOptionSellTurnover  = this.fnoOptionSell*this.fnoOptionQty;
    //Turnover
    this.fnoOptionTurnover = this.fnoOptionBuyTurnover+this.fnoOptionSellTurnover;
    //Brokerage
    this.fnoOptionBrokerage = this.fnoOptionBrokeragePlan*this.fnoOptionQty;
    //transanction charges
    this.fnoOptionExchangetxn = +(this.fnoOptionBuyTurnover*this.fnoOptiontxnCharges).toFixed(2);
    //clearingcharges
    this.fnoOptionClearingcharges = +(this.fnoOptionTurnover*this.fnoOpclearingCharges).toFixed(2);
    //sebi charges
    this.fnoOptionSebicharges = +(this.fnoOptionTurnover*this.fnoOpSebiCharges).toFixed(2);
    //Stamp duty
    this.fnoOptionStampduty = +(this.fnoOptionBuyTurnover*this.fnoOpStampduty).toFixed(2);
    // STT
    this.fnoOptionStt = +(this.fnoOptionSellTurnover*this.fnoOpStt).toFixed(2);
    //GST
    this.fnoOptionGst = +((this.fnoOptionBrokerage+this.fnoOptionExchangetxn+this.fnoOptionClearingcharges)*this.gst).toFixed(2);
    //Total Charges
    this.fnoOptionTotalcharges = +(this.fnoOptionBrokerage+this.fnoOptionExchangetxn+this.fnoOptionClearingcharges+this.fnoOptionSebicharges+this.fnoOptionStampduty+this.fnoOptionStt+this.fnoOptionGst).toFixed(2);
    //Profit/Loss
    this.fnoOptionProfitloss = +(this.fnoOptionSellTurnover-this.fnoOptionBuyTurnover-this.fnoOptionTotalcharges).toFixed(2);
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

