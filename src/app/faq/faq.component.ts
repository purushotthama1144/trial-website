import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PopupComponent } from '../home/popup/popup.component';
import { RiseTicketComponent } from '../rise-ticket/rise-ticket.component';
import { CommunicationService } from '../service/communication/communication.service';
import { FaqService } from '../service/faq/faq.service';
import { PopupService } from '../service/popup/popup.service';
import { ScriptService } from '../service/script/script.service';
import { SeoService } from '../service/seo/seo.service';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  
})
export class FaqComponent implements OnInit {
  popup: any;
  faqText: string = ""
  faqSearchText: string = ""
  options: any[] = [];
  filteredOptions;
  pageloader:boolean = true;
  selectedQuestion: any;
  public selectedIndex: number = 0;
  searchedQuestionsFound: any[] = [];
  config: boolean = false;

  constructor(private router: Router, 
    private faqService: FaqService , 
    private popupservice: PopupService , 
    public dialog: MatDialog , 
    private meta: Meta, 
    private renderer2: Renderer2,
    private scriptService:ScriptService,
    private communicationService:CommunicationService,
    private seoService: SeoService, 
    private title: Title) { 
  }
 

  ngOnInit() {
    setTimeout(() => {
      this.pageloader = false;
    }, 800);
    this.getSeoData()
    this.searchFaqs();
    this.getPopupData()
    // if(this.selectedIndex == 0){
    //   this.router.navigate(['/support']);
    // }
  }

  toggle(index: number) {
    if (!this.config) {
      this.searchedQuestionsFound.filter((menu, i) => i !== index && menu.active).forEach((menu) => (menu.active = !menu.active));
    }
    this.searchedQuestionsFound[index].active = !this.searchedQuestionsFound[index].active;
  }
  
  searchFaqs() {
    this.faqService.searchFaqs()
      .subscribe((response) => {
        this.options = response;
      }, (error) => {
        // console.log(error)
      })
  }
  onTabChanged(event){
    this.selectedIndex = event.index;
    this.selectedIndex == 0?this.router.navigate(['/support/client']):this.router.navigate(['/support/partner']);
  }

  findQuestions() {
    this.faqText = this.faqSearchText;
  }

  change(){
    this.searchedQuestionsFound = this.options.filter((faq)=>faq.question.includes(this.selectedQuestion))
    this.communicationService.nextMessage(this.selectedQuestion)
  }

  openRiseTicket() {
    const dialogRef = this.dialog.open(RiseTicketComponent,{
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }  
  getSeoData() {
    const data = {
      "page_url": `https://aliceblueonline.com${this.router.url}` 
    }
    // this.seoService.createCanonicalURL();
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
    this.scriptService.setJsonLd(this.renderer2,response.json_ld_faqs,'application/ld+json')
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
