import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-video-model',
  templateUrl: './video-model.component.html',
  styleUrls: ['./video-model.component.scss'],
  
})
export class VideoModelComponent implements OnInit {
  isDragging: boolean = false;

  customServeOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 50,
    autoplay: true,
    autoplaySpeed: 800,
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
        items: 2,
        margin:20
      },
      768: {
        items: 3
      }
    }
  }
 
  constructor(@Inject(MAT_DIALOG_DATA) public data:any , private router: Router) { }

  ngOnInit(): void {
    
  }
 
  openVideoDetail(categoryVideo : any) {
    this.router.navigate(['/how-to-videos', categoryVideo.page_url]);
  }
}
