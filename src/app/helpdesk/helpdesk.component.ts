import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PopupComponent } from '../home/popup/popup.component';
import { FaqService } from '../service/faq/faq.service';
import { PopupService } from '../service/popup/popup.service';
import { SeoService } from '../service/seo/seo.service';

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.scss'],
  
})
export class HelpdeskComponent implements OnInit {

  q:any;
  helpDeskSearch: string = "";
  helpDeskSearchText: string = "";
  pageloader:boolean = false

  features = [
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Help+Center/icon/faq.png",
      "title":"FAQ's",
      "description":"In-depth Questions & Answers on everything Alice Blue",
      "link":"/support",
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Help+Center/icon/how-to-videos.png",
      "title":"How to Videos?",
      "description":"Up to date videos to help you get started or finished",
      "link":"/how-to-videos",
    },
  ]
  popup: any;
  helpDesk: any[] = []

  
  popularTopics:any[] = [];

  constructor(private faqservice: FaqService,private router: Router , public dialog: MatDialog , private popupservice: PopupService, private meta: Meta , private seoService: SeoService , private title: Title) { }

  ngOnInit(): void {
    
    this.getpopularTopics()
    this.getSeoData()
    this.getPopupData()
  }

  findQuestions() {
    this.helpDeskSearch = this.helpDeskSearchText
  }

  getpopularTopics(){ 
    this.pageloader = true
    this.faqservice.fetchHelpdeskfaqlink().subscribe((response) => {
      this.popularTopics = response;
      this.pageloader = false
     
    }, (error) => {
      console.log(error)
    })
  }

  routeToFaqs(popularTopic){
    this.router.navigate(['support'],{queryParams:{category:popularTopic.category_url }});
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
