import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PopupComponent } from 'src/app/home/popup/popup.component';
import { DigilinkService } from 'src/app/service/digilink/digilink.service';
import { FaqService } from 'src/app/service/faq/faq.service';
import { PopupService } from 'src/app/service/popup/popup.service';
import { SeoService } from 'src/app/service/seo/seo.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { TCComponent } from '../t-c/t-c.component';

@Component({
  selector: 'app-digilink-client',
  templateUrl: './digilink-client.component.html',
  styleUrls: ['./digilink-client.component.scss'],
  
})
export class DigilinkClientComponent implements OnInit {
  isDragging: boolean = false;
  pageloader: boolean = false;
  clientData : any = {};

  customSalesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    autoplay: true,
    autoplaySpeed: 1000,
    margin: 20,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      468: {
        items: 2,
        margin: 20
      },
      768: {
        items: 3
      }
    }

  }

  offers = []

  faqs:any[] = [];
  config: boolean = false;

  tickInterval = 2;
  autoTicks = false;
  showTicks = false;

  days :any;
  referredValue :any
  referredResult :any
  amount :any
  brokerage :any
  myReward :any
  friendValue :any
  friendResult:any
  myValue :any
  myResult :any

  clientCode: string = "";
  copyLink :string = "" 
  shareLink = `https://aliceblueonline.com/open-account-fill-kyc-request-call-back?c=undefined`

  safeSrc: SafeResourceUrl;

  url = this.router.url;
  popup : any;

  whatsapp_text =`Hi, I have started using Digilink to refer new clients to Alice blue. It's easy and simple. You earn by referring and the referral also earns from Alice blue. This 2-Sided Referral program has 2-Sided benefits! I recommend you to use this Digilink to start referring today! Experience the new way of income by clicking the link`
  facebook_text = `Hi, I have started using Digilink to refer new clients to Alice blue. It's easy and simple. You earn by referring and the referral also earns from Alice blue. This 2-Sided Referral program has 2-Sided benefits! I recommend you to use this Digilink to start referring today! Experience the new way of income by clicking the link`
  linkedin_text =`Hi, I have started using Digilink to refer new clients to Alice blue. It's easy and simple. You earn by referring and the referral also earns from Alice blue. This 2-Sided Referral program has 2-Sided benefits! I recommend you to use this Digilink to start referring today! Experience the new way of income by clicking the link`
  twitter_text = `Hi, I have started using Digilink to refer new clients to Alice blue. It's easy and simple. You earn by referring and the referral also earns from Alice blue. This 2-Sided Referral program has 2-Sided benefits! I recommend you to use this Digilink to start referring today! Experience the new way of income by clicking the link`
  telegram_text=`Hi, I have started using Digilink to refer new clients to Alice blue. Its easy and simple. You earn by referring and the referral also earns from Alice blue. This 2-Sided Referral program has 2-Sided benefits! I recommend you to use this Digilink to start referring today! Experience the new way of income by clicking the link`

  constructor( private dialog : MatDialog , private faqservice: FaqService , 
    private meta: Meta, private seoService: SeoService, private title: Title, 
    private router: Router , private digilinkService : DigilinkService , private popupservice: PopupService , private snackbarService : SnackbarService) {}

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  generateLink() {
    if(this.clientCode){
      this.snackbarService.openSnackBar("mat-primary", "Generated link Successfully");
      this.copyLink = `https://aliceblueonline.com/open-account-fill-kyc-request-call-back?c=${this.clientCode}`;
      this.shareLink = this.copyLink
    }
    else{
      this.snackbarService.openSnackBar("mat-warn", "Please enter Client/Franchise code and then proceed");
    }
    
  }
/* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.snackbarService.openSnackBar("mat-primary", "Link Copied Successfully");
  }
  
  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }
    return 0;
  }
  
  // FirstBlock
  referredBrokerage() {
    this.referredResult = this.referredValue * this.days;
    this.myReward = this.amount * this.referredValue;
  }

  //2nd block
  friendBrokerage() {
    this.friendResult = this.friendValue / this.brokerage;
  }

  //3rd block
  myBrokerage() {
    this.myResult = this.myValue / this.brokerage;
  }

  ngOnInit(): void {
    this.getdigilinkClientdata()
    this.referredBrokerage();
    this.friendBrokerage();
    this.myBrokerage();
    this.getfaq()
    this.getSeoData()
    this.getPopupData()
  }

  openDialog(tnc) {
    this.dialog.open(TCComponent, {
      data : tnc,
      disableClose: true,  
    });
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

  getdigilinkClientdata() {
    this.pageloader = true
    this.digilinkService.digilinkClientData().subscribe((response) => {
      setTimeout(() => {
        this.pageloader = false
      }, 300);
      this.offers = JSON.parse(response.cards_json) 
      this.days = response.days;
      this.referredValue = response.referred_value;
      this.referredResult = response.referred_result;
      this.amount = response.amount;
      this.brokerage = response.brokerage;
      this.myReward = response.my_reward;
      this.friendValue = response.friend_value;
      this.friendResult = response.friend_result;
      this.myValue = response.my_value;
      this.myResult = response.my_result;

      this.clientData = response
    }, (error) => {

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
