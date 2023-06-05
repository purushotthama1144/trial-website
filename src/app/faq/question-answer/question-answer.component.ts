import { Component, Input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FaqService } from 'src/app/service/faq/faq.service';
import { SeoService } from 'src/app/service/seo/seo.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss'],
  
})
export class QuestionAnswerComponent implements OnInit {
  activeCategory: string = "";
  activeSubCategory: string = "";
  questionLikeDislike: any;
  questionAnswer: any;
  constructor(private faqService: FaqService,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService,
    private router: Router, private meta: Meta , private seoService: SeoService, private title: Title) {
  }

  ngOnInit(){
    this.getSeoData()
    this.activatedRoute.params.subscribe(
      params => {
        this.activeCategory = params['category'];
        this.activeSubCategory = params['subCategory'];
        const data = {
          redirect_url: `${this.activeCategory}/${this.activeSubCategory}`
        }
        this.faqService.fetchSpecificFaq(data)
        .subscribe((response)=>{
          this.questionAnswer =  response[0] == 'No Data' ? [] : response;
          if(this.questionAnswer){
            this.fetchLikeDislike(this.questionAnswer.id)
          }
        },(error)=>{
          console.log(error)
        })
      }
    )

  }
  fetchLikeDislike(id) {
    const obj = {
      "faq_id": id
    }
    this.faqService.fetchLikeDislike(obj)
      .subscribe((response) => {
        this.questionLikeDislike = response;
      }, (error) => {
        // console.log("error", error)
      })
  }
  like(id: any) {
    const obj = {
      "faq_id": id,
      "like_status": "Y",
      "dislike_status": "N"
    }
    this.faqService.insertLikeDislike(obj)
      .subscribe((response) => {
        this.snackbarService.openSnackBar("mat-primary", response[0]);
        this.fetchLikeDislike(this.questionAnswer.id);
      }, (error) => {
        // console.log("error", error)
      })
  }

  dislike(id: any) {
    const obj = {
      "faq_id": id,
      "like_status": "N",
      "dislike_status": "Y"
    }
    this.faqService.insertLikeDislike(obj)
      .subscribe((response) => {
        this.snackbarService.openSnackBar("mat-primary", response[0]);
        this.fetchLikeDislike(this.questionAnswer.id);
      }, (error) => {
        // console.log("error", error)
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
}
