import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from 'jquery';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../service/seo/seo.service';
import { EbookService } from '../service/ebook/ebook.service';
import { PopupService } from '../service/popup/popup.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../home/popup/popup.component';
import { PodcastService } from '../service/podcast/podcast.service';

@Component({
  selector: 'app-ebook',
  templateUrl: './ebook.component.html',
  styleUrls: ['./ebook.component.scss'],
  
})
export class EbookComponent implements OnInit {
  filterBy: any = {};
  filteredEbooks: any[] = [];
  allEbook: any[] = [];
  allPodcast: any[] = [];

  isDragging = true;
  filterData: any = {};
  topicSelections: any[] = [];
  languageSelections: any[] = [];
  latestEbooklibrary:any[] = []
  ebook: string = "";
  ebooks:any[] = [];
  q: any;
  scrolled: boolean = false;
  config: boolean = false;
  pageloader: boolean = false;
  url = this.router.url;
  popup : any;

  constructor(private router: Router , 
    private meta: Meta, 
    private seoService: SeoService, 
    private title: Title , 
    private ebookService : EbookService , 
    public dialog: MatDialog , 
    private popupservice: PopupService,
    private podcastService:PodcastService ) { }

  customServeOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    autoplay: true,
    autoplaySpeed: 1000,
    items: 3,
    margin: 10,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    nav: false,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    responsive: {
      0: {
        items: 1
      },
      468: {
        items: 1,
        margin:20
      },
      768: {
        items: 3
      }
    }
  }

  ngOnInit(): void {
    this.getSeoData()
    this.getEbookList()
    this.getPopupData()
    this.getFilterData()
    // this.getPodcastList()
  }

  toggle() {
    this.config = true
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

  getEbookList() {
    this.pageloader = true
    this.ebookService.fetchEbookList().subscribe((response) => {
      this.ebooks = response[0] == 'No Data'?[]:response;
      setTimeout(() => {
        this.pageloader = false
      }, 300);
      const ebooks = [];
      if(this.ebooks.length > 0){
        this.ebooks.forEach((ebook:any)=>{
          ebook['language'] = ebook.ebook_language;
          ebook['topic'] = ebook.ebook_page_url;
          ebook['ebook_topics'] = JSON.parse(ebook.ebook_topics)
        })
      }
      this.filteredEbooks = this.ebooks;
    } ,  (error) => {
      console.log(error)
    })
  }

  ebookDetail(item: any) {
    this.router.navigate(['/ebook' , item.ebook_page_url]);
  }

  getPodcastList() {
    this.podcastService.fetchallPodcastData().subscribe((response)=> {
      this.allPodcast = response
    } , (error) => {
      console.log(error)
    })
  }

  getFilterData() {
    this.ebookService.fetchFilterData().subscribe((response) => {
      this.filterData = response[0] == "No Data"?[]:response;
      if(this.filterData && 
        ((this.filterData.topics && this.filterData.topics.length > 0) || 
          (this.filterData.languages && this.filterData.languages.length > 0))){
        this.filterData.topics = this.filterData.topics.map((topic) => {
          return {
            topic: topic,
            checked: false
          }
        })
        this.topicSelections = this.filterData.topics.filter(x => x.checked === true).map(x => x.topic);
        this.filterData.languages = this.filterData.languages.map((language) => {
          return {
            language: language,
            checked: false
          }
        })
        this.languageSelections = this.filterData.languages.filter(x => x.checked === true).map(x => x.language);
      }
    })
  }

  getTopicCheckboxes() {
    this.topicSelections = this.filterData.topics.filter(x => x.checked === true).map(x => x.topic);
    this.filterBy = { topic: this.topicSelections, language: this.languageSelections }
    this.filteredEbooks = this.filterLogic();
  }

  getLanguageCheckboxes() {
    this.languageSelections = this.filterData.languages.filter(x => x.checked === true).map(x => x.language);
    this.filterBy = { topic: this.topicSelections, language: this.languageSelections }
    this.filteredEbooks = this.filterLogic();
  }

  filterLogic() {
    const getValue = value => (typeof value === 'string') ? value.toUpperCase() : value;
    const filterKeys = Object.keys(this.filterBy);
    return this.ebooks.filter(item => {
      return filterKeys.every(key => {
        if (!this.filterBy[key].length) return true;
        return this.filterBy[key].find(filter => getValue(filter) === getValue(item[key]));
      });
    });
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
