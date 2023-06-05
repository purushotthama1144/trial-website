import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PopupComponent } from '../home/popup/popup.component';
import { FaqService } from '../service/faq/faq.service';
import { PopupService } from '../service/popup/popup.service';
import { SeoService } from '../service/seo/seo.service';

@Component({
  selector: 'app-dealing-desk',
  templateUrl: './dealing-desk.component.html',
  styleUrls: ['./dealing-desk.component.scss'],
  
})
export class DealingDeskComponent implements OnInit {
  faqs:any[] = [];
  config: boolean = false;
  pageloader: boolean = true

  calltradeBenefits = [
    "Quick option provided for customers to buy and trade stocks over the phone during market hours, while you cannot access your computer or the internet",
    "You can also get your related queries clarified from our expert dealers, while you choose this call and trade facility",
    "We offer this call and trade facility to all our clients from 8.30am to 11.30pm” for hassle free trade. Our executive will trade as per your instructions",
    "You can also place as many orders as you wish, through one call, across multiple segments too."
  ]
  calltradeFacilities = [
    `Call our centralized dealing desk number: Ph:- <a href="tel:08035215000">080-35215000</a> or <a href="tel:08045490850">080-45490850</a> from anywhere in India`,
    "Call using your registered number to get connected with one of our dealers.",
    "Verify your identity and place your order",
    "Your trading account will be updated and show the order details."
  ]
  popup: any;

  constructor(private faqservice : FaqService , private meta: Meta, 
    private seoService: SeoService, private title: Title, private router: Router ,  
    public dialog: MatDialog , private popupservice: PopupService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageloader = false
    }, 300);
    this.getfaq();
    this.getSeoData()
    this.getPopupData()
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
      "page_url":this.router.url == '/'?'/':this.router.url
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
