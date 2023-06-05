import { Component, Input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FaqService } from 'src/app/service/faq/faq.service';
import { SeoService } from 'src/app/service/seo/seo.service';

@Component({
  selector: 'faq-user',
  templateUrl: './faq-user.component.html',
  styleUrls: ['./faq-user.component.scss'],
  
})
export class FaqUserComponent implements OnInit {
  @Input('selectedQuestion') selectedQuestion: string;
  questionAnswers: any[] = [];
  activeCategory: any;
  activeSubCategory: any;
  faqs: any[] = [];
  clientFaqs: any[]=[];
  partnerFaqs: any[] = [];
  loading: boolean = false;
  panelOpenState = false;
  pageloader:boolean = false;
  
  constructor(private faqService: FaqService,
    private router: Router , 
    private meta: Meta , 
    private seoService: SeoService, 
    private title: Title) {
  }

  ngOnInit(): void {
    this.fetchFaqs();
    this.getSeoData()
  }

  fetchFaqs() {
    this.loading = true;
    this.pageloader = true;
    this.faqService.fetchFaqs()
      .subscribe((response) => {
        this.faqs = response[0] == 'No Data'?[]:response;
        this.getQuestionAnswers();
      }, (error) => {
      })
  }

  getQuestionAnswers() {
    this.loading = false;
    this.pageloader = false;
    if (this.faqs.length > 0) {
      this.activeCategory = this.faqs[0].redirect_url_category;
      this.activeSubCategory = this.faqs[0].sub_categories[0].redirect_url_subcategory;
      if( this.activeCategory && !this.activeSubCategory){
        if(this.router.url.split('/')[this.router.url.split('/').length -  1] == 'support'){
          this.router.navigate(['support'],{queryParams:{category:this.activeCategory}});
        }
      }
      else {
        if(this.router.url.split('/')[this.router.url.split('/').length -  1] == 'support'){
          this.router.navigate(['support'],{queryParams:{category:this.activeCategory, subCategory: this.activeSubCategory}});
        }
      }
    }
  }
  onClickCategory(event,faq){
    this.activeCategory = faq.redirect_url_category;
    this.router.navigate(['support'],{queryParams:{category:faq.redirect_url_category}});
  }

  onClickSubCategory(event,category,subCategory: any) {
    event.stopPropagation();
    this.activeCategory = category;
    this.activeSubCategory = subCategory.redirect_url_subcategory;
    this.router.navigate(['support'],{queryParams:{category:this.activeCategory, subCategory: this.activeSubCategory}});
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
