import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending-tools',
  templateUrl: './trending-tools.component.html',
  
styleUrls: ['./trending-tools.component.scss']
})
export class TrendingToolsComponent implements OnInit {

  // trendingTools = [
  //   {
  //     "title":"Margin Calculator" , 
  //     "description":"Did you know that the Brokerage could be low as 5% or even as high as 80% of total transaction cost. Get a Detailed breakup of total Trading cost and its impact on your pocket with Brokerage Calculator" ,
  //     "linkText":"Uncover Trading Cost" ,  
  //     "link":"https://ant.aliceblueonline.com/margin-calculator/"
  //   },
  //   {
  //     "title":"Pivot Points" , 
  //     "description":"Is your analysis or sixth sense guilding you to go Bullish or Bearish on a Scrip? Support your trading decision with Pivot Points technical analysis indicator. It represents Market sentiments, Support and Resistance levels of a scrip." ,
  //     "linkText":"Get Techinical Analysis" ,  
  //     "link":"/pivot-points"},
  //   {
  //     "title":"RMS Live Updates" , 
  //     "description":"Discover latest required margin with live RMS. But why?? The Required margin Increases or Decreases in Live Stock market based on volatility of the market or scrip itself." , 
  //     "linkText":"View Latest Margins" ,  
  //     "link":"/rms-live-updates/exposures"},
  //   {
  //     "title":"Option Calculator" , 
  //     "description":"The Brokerage Calculator allows our customers to get a clear understanding of the returns on investments and the breakup of charges regarding turnover charges, brokerage fees, Taxes, etc." ,
  //     "linkText":"Calculate Brokerage" ,  
  //     "link":"https://ant.aliceblueonline.com/margin-calculator/"
  //   },
  // ]
  constructor() { }

  ngOnInit(): void {
  }

}
