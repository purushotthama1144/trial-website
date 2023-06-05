import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CalculatorService } from 'src/app/service/calculator/calculator.service';
import { SeoService } from 'src/app/service/seo/seo.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  
})
export class OptionComponent implements OnInit {
   /*radio start*/
  calculator_data : any[] = [];
  niftyOptionCalc: string = "1";
  niftyOptionplans: any[] = [
    {
      "name":"Trade Pro (T-Pro) Plan", 
      "value":"1"
    },
    {
      "name":"Freedom 15 (F15) Plan",
      "value":"2"
    }
  ];

  bankNiftyCalc: string = "1";
  bankNiftyplans: any[] = [
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

  imgrtxtlcommodity = {
    "image": "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/option.png",
    "content": "It is an online tool to calculate the minimum money or margin required to trade NIFTY and BANK NIFTY Option contracts. Leverage is provided on both buy and sell side of options contracts.",
  }

  pageloader:boolean = true

  banknifty = 1
  niftySpanmargin = 100000
  niftyMarginavailable = 1000
  niftyPremiumprice = 1
  
  /*Exposure */
  exposure = 2

  /*Nifty Options Buy*/
  niftyOptionlotSize = 50
  niftyOption = 50
  niftyOptionMarginrequired = 0
  niftyOptionAlicemargin = 0
  niftyOptionNumberoflots = 0

  /*Bank niftyOption */
  niftyBanklotSize = 25
  niftyBank = 25
  niftyBankMarginrequired = 0
  niftyBankAlicemargin = 0
  niftyBankNumberoflots = 0
    
  /*Nifty Sell*/
  sellmarginRequired = 0
  sellLotsize = 1
  sellAlicemargin = 0
  sellNumberoflots = 0

  selectedIndex = 1;
  selectedIndexone = 1;
  
  constructor(private router: Router , private meta: Meta , 
    private seoService: SeoService , private title: Title ,
    private calculatorService: CalculatorService) { 
   
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageloader = false
    }, 300);
    this.getCalculatorData()
    this.calculateBanknifty();
    this.calculateOptionnifty();
    this.getSeoData()
  }

  getCalculatorData() {
    this.pageloader = true
    const data = {
      "margin_calculator_type": "Index & Equity Future"
    }
    this.calculatorService.getCalculatorData(data)
      .subscribe((response: any) => { 
        this.calculator_data = response
        if(this.calculator_data){
          this.calculator_data = this.calculator_data.filter((data) => data.scrip == 'NIFTY')
          this.niftySpanmargin = this.calculator_data[this.calculator_data.length-1].nrml_margin
        }
        setTimeout(() => {
        }, 200);
      }, (error) => {
       console.log(error)
    })
  }

  setSelected(id: number) {
    this.selectedIndex = id;
    this.selectedIndexone = id;
  }

  calculateOptionnifty() {
    //In future for change in plans consider this and include according to the equation (+this.niftyOptionCalc)
    
    if(this.selectedIndex == 1){
      this.niftyOptionMarginrequired = Math.floor(this.niftyOptionlotSize*this.niftyPremiumprice);
      // this.niftyOptionAlicemargin = Math.floor(this.niftyOptionMarginrequired/this.exposure);
      this.niftyOptionAlicemargin = Math.floor(this.niftyOptionMarginrequired);
      this.niftyOptionNumberoflots = Math.floor(this.niftyOptionlotSize/this.niftyOption);
    }
    else if(this.selectedIndex == 2){
      this.sellNumberoflots = Math.floor(this.niftyOptionlotSize/this.niftyOption) ;
      this.sellmarginRequired = Math.floor(this.sellNumberoflots*this.niftySpanmargin);
      // this.sellAlicemargin = Math.floor(this.sellmarginRequired/this.exposure);
      this.sellAlicemargin = Math.floor(this.sellmarginRequired);
    }
  }

  calculateBanknifty() {
    //In future for change in plans consider this and include according to the equation (+this.bankNiftyCalc)
    if(this.selectedIndexone == 1){
      this.niftyBankMarginrequired = Math.floor(this.niftyBanklotSize*this.niftyPremiumprice);
      // this.niftyBankAlicemargin = Math.floor(this.niftyBankMarginrequired/this.exposure);
      this.niftyBankAlicemargin = Math.floor(this.niftyBankMarginrequired);
      this.niftyBankNumberoflots = Math.floor(this.niftyBanklotSize/this.niftyBank);
    }
    else if(this.selectedIndexone == 2){
      this.sellNumberoflots = Math.floor(this.niftyBanklotSize/this.niftyBank) ;
      this.sellmarginRequired = Math.floor(this.sellNumberoflots*this.niftySpanmargin);
      // this.sellAlicemargin = Math.floor(this.sellmarginRequired/this.exposure);
      this.sellAlicemargin = Math.floor(this.sellmarginRequired);
    }
    
  }
  
  reset(){
    this.niftyOptionlotSize = 75
    this.niftyBanklotSize = 25
    this.niftyPremiumprice = 1
    this.niftyOptionMarginrequired = this.sellmarginRequired = 0
    this.niftyOptionAlicemargin = this.sellAlicemargin = 0
    this.niftyOptionNumberoflots = 0
    this.niftyMarginavailable = 100
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
