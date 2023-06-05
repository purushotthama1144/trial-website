import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FaqService } from 'src/app/service/faq/faq.service';
import { HowToVideosService } from 'src/app/service/how-to-videos/how-to-videos.service';
import { SeoService } from 'src/app/service/seo/seo.service';

@Component({
  selector: 'app-how-to-detail',
  templateUrl: './how-to-detail.component.html',
  styleUrls: ['./how-to-detail.component.scss'],
  
})
export class HowToDetailComponent implements OnInit {
  id: string = "";
  item: any;
  pageurl: string = "";
  specificDescription : any;
  
  faqs: any[] = [];
  config: boolean = false;
  pageloader: boolean = false;

  constructor(private route: ActivatedRoute , private howtovideoservice : HowToVideosService , 
    private router: Router , private faqservice : FaqService , 
    private meta : Meta , private seoService : SeoService ,
    private title : Title) { }

  ngOnInit(): void {
    this.getfaq();
    this.getSeoData()
    
    this.route.params.subscribe(
      params => {
        this.pageurl = params['pageurl'];
        if(this.pageurl) {
          this.fetchUrlSpecificDetails() 
        }
        else {
          this.router.navigate(['page-not-found'])
        }
      }
    )
    
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

  getspecificVideodetail(){
    this.pageloader = true
    const data = {
      "id": this.id
    }
    this.howtovideoservice.fetchspecificVideodetails(data).subscribe((response) => {
      this.specificDescription = response;
      setTimeout(() => {
        this.pageloader = false
      }, 300);
    } , (error) => {
      console.log(error)
    })
  }
  
  fetchUrlSpecificDetails(){
    const data = {
      "page_url": this.pageurl
    }
    this.howtovideoservice.fetchUrlSpecificDetails(data)
    
    .subscribe((response) => {
      this.specificDescription = response

    } , (error) => {
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
  
}
