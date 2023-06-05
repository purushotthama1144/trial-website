import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CareerService } from '../service/career/career.service';
import { SeoService } from '../service/seo/seo.service';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  
})
export class CareersComponent implements OnInit {

  shown: boolean = false;
  pageloader: boolean = false;

  searchLocation: string = "";
  searchTitle: string = "";
  searchTitleText: string = "";
  searchLocationText: string = "";

  q: any;
  
  careerList: any;

  isDragging: boolean = true;
  constructor(private router: Router, private careerService : CareerService , private meta: Meta , private title: Title , private seoService : SeoService) {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 10,
    autoplay: true,
    autoplaySpeed: 1000,
    margin: 20,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    nav: false,
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

  workData = ["https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/work-space/workplace-1.jpg", "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/work-space/workplace-2.jpg", "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/work-space/workplace-3.jpg", "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/work-space/workplace-4.jpg", "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/work-space/workplace-5.jpg", "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/work-space/workplace-6.jpg", "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/work-space/workplace-7.jpg", "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/work-space/workplace-8.jpg", "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/work-space/workplace-9.jpg"]
  funData = ["https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/work-space/fun-1.jpg", "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/work-space/fun-2.jpg", "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/work-space/fun-3.jpg"]
  
  ngOnInit(): void {
    this.getCareer()
    this.getSeoData()
  }

  findJobs() {
    this.searchTitle = this.searchTitleText
    this.searchLocation = this.searchLocationText
  }

  openCarrerDetail(career: any){
    this.router.navigate(['/careers/job',career.redirect_url],{queryParams:{id:career.id}});
  }
  
  getCareer(){
    this.pageloader = true
    this.careerService.getCareerData()
      .subscribe((response: any) => {
        this.careerList = response;
        setTimeout(() => {
          this.pageloader = false
        }, 200);
      }, (error) => {
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
