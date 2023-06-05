import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PopupComponent } from '../home/popup/popup.component';
import { FaqService } from '../service/faq/faq.service';
import { PopupService } from '../service/popup/popup.service';
import { SeoService } from '../service/seo/seo.service';

@Component({
  selector: 'app-digipromo',
  templateUrl: './digipromo.component.html',
  styleUrls: ['./digipromo.component.scss'],
  
})
export class DigipromoComponent implements OnInit {
  pageloader: boolean = true
  safeSrc: SafeResourceUrl;

  content = [
    `DIGIPromo is a dedicated application which our clients, AP’s and BDR's can make use for promotional activities as well as Lead generation. Use the social media sharing feature to share images, videos and articles.
    Get <u>referral benefits</u> when a user from your social circle opens an account.
    <br><br>
    Additionally, earn rewards from DIGIPromo contests!`
  ]
  
  benefitWorking:any[] = [
    {
      "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/digipromo/Login.png",
      "title":"Login",
      "desc":"Download the DIGIPromo app & login with your client or partner ID."
    },
    {
      "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/digipromo/Browse.png",
      "title":"Browse & Pick",
      "desc":"Browse through video, image & text content and pick the content you like."
    },
    {
      "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/digipromo/Share.png",
      "title":"Share",
      "desc":"Share the content on Facebook, Twitter, WhatsApp, Telegram or LinkedIn with your DigiLink URL"
    },
    {
      "icon":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/digipromo/Commission.png",
      "title":"Earn",
      "desc":"Earn commission & 2-sided referral benefits when people from your social network join Alice Blue"
    },
  ]

  milestones = [
    {
      "flag":"15000+",
      "desc":"Active Digipromo Users",
      "rating":"*****",
    },
    {
      "flag":"Rs 12 Lakh+",
      "desc":"Rewards won by contest Participants",
      "rating":"****",
    },
    {
      "flag":"Rs 20 Lakh+",
      "desc":"Commission Earned by active users",
      "rating":"***",
    },
  ]
  
  faqs:any[] = [];
  config: boolean = false;

  url = this.router.url;
  popup : any;

  constructor(private sanitizer: DomSanitizer , private faqservice: FaqService , private meta: Meta,
     private seoService: SeoService, private title: Title, private router: Router , 
     public dialog: MatDialog , private popupservice: PopupService) { 
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/b_eMDUMQZyM");
  }

  ngOnInit(): void {
    this.getfaq()
    this.getSeoData()
    this.getPopupData()
    setTimeout(() => {
      this.pageloader = false
    }, 300);
  }

  toggle(index: number) {
    if (!this.config) {
      this.faqs.filter((menu, i) => i !== index && menu.active).forEach((menu) => (menu.active = !menu.active));
    }
    this.faqs[index].active = !this.faqs[index].active;
  }

  getfaq(){
    const data = {
      "page_url": this.router.url
    }
    this.faqservice.fetchsinglePagefaq(data).subscribe((response: any) => {
      this.faqs = response[0] == 'No Data'?[]:response;
    } ,  (error) => {
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


