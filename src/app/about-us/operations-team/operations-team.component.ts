import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from 'jquery';

@Component({
  selector: 'app-operations-team',
  templateUrl: './operations-team.component.html',
  styleUrls: ['./operations-team.component.scss'],
  
})
export class OperationsTeamComponent implements OnInit {
  isDragging: boolean = false;
  //Operations start
  customOperationsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    // autoplay: true,
    autoplaySpeed: 1000,
    margin: 20,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    nav: true,
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

  operationData = [
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
      "title":"SIDHA VELAYUTHAM",
      "position":"Founder & CEO",
      "instaLink":""
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
      "title":"SIDHA VELAYUTHAM",
      "position":"Founder & CEO",
      "instaLink":""
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
      "title":"SIDHA VELAYUTHAM",
      "position":"Founder & CEO",
      "instaLink":""
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
      "title":"SIDHA VELAYUTHAM",
      "position":"Founder & CEO",
      "instaLink":""
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
      "title":"SIDHA VELAYUTHAM",
      "position":"Founder & CEO",
      "instaLink":""
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
      "title":"SIDHA VELAYUTHAM",
      "position":"Founder & CEO",
      "instaLink":""
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
      "title":"SIDHA VELAYUTHAM",
      "position":"Founder & CEO",
      "instaLink":""
    }
  ]
  //Operations end

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {

  }

}
