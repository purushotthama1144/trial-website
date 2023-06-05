import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BlogService } from '../service/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  
})

export class BlogComponent implements OnInit {
  carouselBlogData:any[] = [];

  isDragging: boolean = false;

  customBlogOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    autoplay: true,
    autoplaySpeed: 1000,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    responsive: {
      0: {
        items: 1
      },
      468: {
        items: 2,
        margin:20
      },
      768: {
        items: 3
      },
      
    },
    nav: true
  }

  constructor(private router: Router, private blogService: BlogService) { }

  ngOnInit(): void {
    this.getBlogContent()
  }

  openBlogDetail(item: any) {
    this.router.navigate([item.redirect_url]);
  }

  getBlogContent() {
    const data = {
      "category": "Main Blog"
    }
    this.blogService.mainBlogs().subscribe((response: any) => {
      if(response[0] == 'No Data'){
        this.carouselBlogData = []
      }
      else{
        this.carouselBlogData = response;
        if(this.carouselBlogData.length > 1){
          this.carouselBlogData.reverse()
        }
      }
    }, (error) => {
        console.log(error)
    })
  }
}
