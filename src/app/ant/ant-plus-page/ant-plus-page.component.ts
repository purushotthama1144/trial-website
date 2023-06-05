import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PopupComponent } from 'src/app/home/popup/popup.component';
import { AntService } from 'src/app/service/ant/ant.service';
import { InteractionService } from 'src/app/service/interaction/interaction.service';
import { PopupService } from 'src/app/service/popup/popup.service';
import { SeoService } from 'src/app/service/seo/seo.service';

@Component({
  selector: 'app-ant-plus-page',
  templateUrl: './ant-plus-page.component.html',
  styleUrls: ['./ant-plus-page.component.scss'],
  
})
export class AntPlusPageComponent implements OnInit {
  antPlusData : any = {}
  pageloader:boolean = false
  url = this.router.url;
  popup : any;

  apis = [
    {
      "header": "Convenient",
      "desc": "Kickstart your trading product development journey hassle-free",
    },
    {
      "header": "Robust",
      "desc": "Build a scalable platform with our infrastructure and frameworks",
    },
    {
      "header": "Free",
      "desc": "Get access to the API at zero cost for lifetime",
    },
    {
      "header": "Secure",
      "desc": "Rely on a trusted provider with over 16 years of expertise",
    },
  ]

  imageleftTextright ={
    "heading": "Key Features"
  }

  imagerightTextleft = {
    "heading": "Benefits"
  }

  textleftTextright = {
    "largeHeader": "How to get started with<span> ANT Plus </span>API keys",
  
    "list": [
      
      "Get an Alice Blue client account or partner account if you don't already have one. You will need this for integration and testing.",
      "Write to us at <a href='mailto:api@aliceblueindia.com'> api@aliceblueindia.com</a> to get free access to the APIs.",
      "Once you receive the access, Login to Demo testing with Client Secret and KEY authorization.",
      "Callback URL Mapping.",
      "Start trading from your unique Portal",
    ],
  }

  programmingLanguage = {
    "image":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/ANT+Plus+API/trade-with-your-favorite-programming-language.png",
    "title":"Trade with your favorite programming language with our <span>HTTP/JSON APIs</span>."
  }

  logos = []
  
  constructor(private router: Router, private antService : AntService, private interactionService: InteractionService , 
    private seoService : SeoService , private meta: Meta , private title: Title ,
    private popupservice: PopupService , public dialog: MatDialog , @Inject(PLATFORM_ID) private platformId: any ) { }

  ngOnInit(): void {
    this.getAntData()
    this.getPopupData()
  }

  explore(){
    if (isPlatformBrowser(this.platformId)) {
      window.open('/antplus2',"_blank")
    }
    // this.router.navigate([''] ).then(res =>{window.open('/antplus2',"_blank") })
    this.interactionService.interactionSelected.emit(true);
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

  getAntData() {
    this.pageloader = true
    const data = {
      "ant_type":"ant-plus"
    }
    this.antService.fetchAntData(data).subscribe((response) => {
  
      this.antPlusData = response[0] == 'No Data'?[]:response;
      setTimeout(() => {
        this.pageloader = false
      }, 300);
    } , (error) => {
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
}
