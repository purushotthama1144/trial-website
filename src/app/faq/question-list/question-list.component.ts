import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from 'src/app/service/communication/communication.service';
import { FaqService } from 'src/app/service/faq/faq.service';
import { SeoService } from 'src/app/service/seo/seo.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  
})
export class QuestionListComponent implements OnInit {

  selectedQuestion: string = '';

  questionAnswers: any[] = [];
  user: string = "";
  activeCategory: string = "";
  activeSubCategory: string = "";
  faqs: any[] = [];
  clientFaqs: any[] = [];
  partnerFaqs: any[] = [];
  loading: boolean = false;
  pageloader: boolean = false;
  q: any;
  questionAnswer: any;
  constructor(private faqService: FaqService,
    private router: Router,
    private communicationService:CommunicationService,
    @Inject(PLATFORM_ID) private platformId: any,
    private activatedRoute: ActivatedRoute , 
    public dialog: MatDialog , private meta: Meta, 
    private seoService: SeoService, 
    private title: Title) {
  }

  ngOnInit(): void {
    this.getSeoData();
    this.communicationService.sharedMessage.subscribe((response)=>{
      this.selectedQuestion = response;
    })

    this.activatedRoute.queryParams.subscribe(
      params => {
        this.activeCategory = params['category'];
        this.activeSubCategory = params['subCategory'];
        this.fetchFaqs();
      }
    )
  }

  fetchFaqs() {
    this.loading = true;
    this.pageloader = true;
    this.faqService.fetchFaqs()
      .subscribe((response) => {
        this.pageloader = false;
        this.faqs = response[0] == 'No Data' ? [] : response;
        this.getQuestionAnswers();
      }, (error) => {
        // console.log("error", error)
      })

  }

  getQuestionAnswers() {
    if (this.faqs.length > 0) {
      if (!this.activeCategory) {
        this.questionAnswers = this.faqs[0].sub_categories[0].faqs;
        this.loading = false;
        this.pageloader = false;
      }
      else {
        if (!this.activeSubCategory) {
          this.questionAnswers = [];
          this.faqs.forEach((faq) => {
            if (this.activeCategory == faq.redirect_url_category) {
              faq.sub_categories.forEach((sub_category) => {
                this.questionAnswers.push(...sub_category.faqs);
              })
            }
          })
          this.questionAnswers = [...new Map(this.questionAnswers.map(item => [item['id'], item])).values()]
          this.loading = false;
          this.pageloader = false;
        }
        else {
          this.faqs.forEach((faq) => {
            if (this.activeCategory == faq.redirect_url_category) {
              faq.sub_categories.forEach((sub_category) => {
                if (this.activeSubCategory == sub_category.redirect_url_subcategory) {
                  this.questionAnswers = sub_category.faqs;
                  this.loading = false;
                  this.pageloader = false;
                }
              })
            }
          })
        }
      }
    }
  }
  moveToAnswer(question) {
    const url1 = question.final_redirect_url.split('/')[0];
    const url2 = question.final_redirect_url.split('/')[1];
    // this.router.navigate(['/support', url1, url2] );
    if (isPlatformBrowser(this.platformId)) {
      window.open(`/support/${url1}/${url2}`,"_blank") 
      // this.router.navigate([]).then(res =>{});
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
