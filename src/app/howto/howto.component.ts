import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Meta, SafeResourceUrl, Title } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { VideoModelComponent } from './video-model/video-model.component'
import { Router } from '@angular/router';
import { HowToVideosService } from '../service/how-to-videos/how-to-videos.service';
import { SeoService } from '../service/seo/seo.service';
import { PopupComponent } from '../home/popup/popup.component';
import { PopupService } from '../service/popup/popup.service';

@Component({
  selector: 'app-howto',
  templateUrl: './howto.component.html',
  
styleUrls: ['./howto.component.scss']
})
export class HowtoComponent implements OnInit {
  filterBy: any = {};
  objectKeys = Object.keys;
  pageloader: boolean = false;

  filterCheckTopic: boolean = false;
  filterCheckLanguage: boolean = false;
  isDragging = true;
  filterData: any = {};
  iframeUrl: any[] = [];
  allVideos: any[] = [];
  filteredVideos: any[] = [];
  categories: any[] = [];
  categoryVideos: any[] = [];
  filter: any;
  q: any;
  scrolled: boolean = false;
  howToVideos: string = ""
  searchVideoText: string = ""
  searchVideoTopic: string = ""
  searchVideoLanguage: string = ""
  safeSrc: SafeResourceUrl;
  topicSelections: any[] = [];
  languageSelections: any[] = [];
  popup: any;

  constructor(public sanitizer: DomSanitizer, public dialog: MatDialog, private router: Router, 
    private howtovideosservice: HowToVideosService ,
    private meta: Meta , private seoService: SeoService , private title: Title , private popupservice : PopupService) { }

  customServeOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    // autoplay: true,
    autoplaySpeed: 1000,
    items: 3,
    margin: 10,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    nav: true,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    responsive: {
      0: {
        items: 1
      },
      468: {
        items: 1,
        margin: 20
      },
      768: {
        items: 3
      }
    }
  }

  ngOnInit(): void {
    this.getAllVideos();
    this.getCategoriesVideo()
    this.getFilterData()
    this.getSeoData()
    this.getPopupData()
  }

  findVideos() {
    this.howToVideos = this.searchVideoText
  }

  openDialog(category:any) {
    const dialogRef = this.dialog.open(VideoModelComponent,{
      width: this.categories[category].length > 2?'80%':'60%',
      height:'520px',
      data:{
        categoryVideos: this.categories[category]
      },
    });
  }
  openVideoDetail(item : any) {
    this.router.navigate(['/how-to-videos',item.page_url]);
  }

  getAllVideos() {
    this.pageloader = true;
    this.howtovideosservice.fetchAllVideo().subscribe((response) => {
      this.allVideos = response[0] == 'No Data' ? [] : response;
      this.filteredVideos = this.allVideos;
      setTimeout(() => {
        this.pageloader = false
      }, 1000);
    }, (error) => {
      console.log(error)
    })
  }

  getCategoriesVideo() {
    this.howtovideosservice.fetchCategoryVideo().subscribe((response) => {
      this.categories = response[0] == 'No Data' ? [] : response;
    }, (error) => {
      console.log(error)
    })
  }

  getFilterData() {
    this.howtovideosservice.fetchfilterData().subscribe((response) => {

      this.filterData = response
      this.filterData.topics = this.filterData.topics.map((topic) => {
        return {
          topic: topic,
          checked: false
        }
      })
      this.topicSelections = this.filterData.topics.filter(x => x.checked === true).map(x => x.topic);
      this.filterData.language = this.filterData.language.map((language) => {
        return {
          language: language,
          checked: false
        }
      })
      this.languageSelections = this.filterData.language.filter(x => x.checked === true).map(x => x.language);
    })
  }

  getTopicCheckboxes() {
    this.topicSelections = this.filterData.topics.filter(x => x.checked === true).map(x => x.topic);
    this.filterBy = { topic: this.topicSelections, language: this.languageSelections }
    this.filteredVideos = this.filterLogic();
  }

  getLanguageCheckboxes() {
    this.languageSelections = this.filterData.language.filter(x => x.checked === true).map(x => x.language);
    this.filterBy = { topic: this.topicSelections, language: this.languageSelections }
    this.filteredVideos = this.filterLogic();
  }

  filterLogic() {
    const getValue = value => (typeof value === 'string') ? value.toUpperCase() : value;
    const filterKeys = Object.keys(this.filterBy);
    return this.allVideos.filter(item => {
      return filterKeys.every(key => {
        if (!this.filterBy[key].length) return true;
        return this.filterBy[key].find(filter => getValue(filter) === getValue(item[key]));
      });
    });
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
