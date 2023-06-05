import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SeoService } from '../service/seo/seo.service';
import { SnackbarService } from '../service/snackbar/snackbar.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
  
})
export class BankDetailsComponent implements OnInit {
  clientCode: string = "";
  copyLink: string = "";
  shareLink: string = "";
  pageloader:boolean = true
  clientId= "ABFSPL"
  
  funds = [
    {
      img:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/No+limitation.png",
      alt:"No Limitation",
      desc:"There is <b>No Limitation</b> to transfer money"
    },
    {
      img:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/No+need+to+wait.png",
      alt:"No need to wait for a day for the cheque to clear",
      desc:"There’s <b>no need to wait</b> for a day for the cheque to clear."
    },
    {
      img:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Transfer+instantly.png",
      alt:"Transfer money from anywhere Instantly",
      desc:"Transfer money from <b>anywhere Instantly</b>"
    },
  ]

  gatewayStatus = [
    {
      title:"Success",
      image:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Success_fund+received.png",
      content:"Fund received to Client ledger & available for Trading."
    },
    {
      title:"Pending",
      image:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Pending.png",
      content:"Fund hasn’t received <b>TAT : 24 hrs</b>"
    },
    {
      title:"Failure",
      image:"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Failure.png",
      content:"It will reverse based on bank processing time."
    },
  ]

  moreDetail = [
    {
      mode:"UPI through Back Office",
      reflection:"Reflect Immediately  in Back Office",
      proof:"NA",
      tat:"Within a minute"
    },
    {
      mode:"UPI through Back Office",
      reflection:"Reflect Immediately  in Back Office",
      proof:"NA",
      tat:"Within a minute"
    },
    {
      mode:"UPI through Back Office",
      reflection:"Reflect Immediately  in Back Office",
      roof:"NA",
      tat:"Within a minute"
    },
    {
      mode:"UPI through Back Office",
      reflection:"Reflect Immediately  in Back Office",
      proof:"NA",
      tat:"Within a minute"
    },
    {
      mode:"UPI through Back Office",
      reflection:"Reflect Immediately  in Back Office",
      proof:"NA",
      tat:"Within a minute"
    },
  ]
  constructor(private snackbarService: SnackbarService , private seoService : SeoService , private meta: Meta , private title: Title , private router : Router) { }

  ngOnInit(): void {
    this.getSeoData()
    setTimeout(() => {
      this.pageloader = false
    }, 300);
  }

  generateLink() {
    if(this.clientCode){
      this.snackbarService.openSnackBar("mat-primary", "Generated link Successfully");
      this.copyLink = `${this.clientId}${this.clientCode}`;
      this.shareLink = this.copyLink
    }
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
