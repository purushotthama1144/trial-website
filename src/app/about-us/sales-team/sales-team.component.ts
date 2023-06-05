import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-sales-team',
  templateUrl: './sales-team.component.html',
  styleUrls: ['./sales-team.component.scss'],
  
})
export class SalesTeamComponent implements OnInit {
  isDragging: boolean = false;
  constructor() { }
//Sales start
customSalesOptions: OwlOptions = {
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

salesData = [
  {
    "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
    "title":"Sidha velayutham",
    "position":"Founder & CEO",
    "instaLink":""
  },
  {
    "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
    "title":"Sidha velayutham",
    "position":"Founder & CEO",
    "instaLink":""
  },
  {
    "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
    "title":"Sidha velayutham",
    "position":"Founder & CEO",
    "instaLink":""
  },
  {
    "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
    "title":"Sidha velayutham",
    "position":"Founder & CEO",
    "instaLink":""
  },
  {
    "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
    "title":"Sidha velayutham",
    "position":"Founder & CEO",
    "instaLink":""
  },
  {
    "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
    "title":"Sidha velayutham",
    "position":"Founder & CEO",
    "instaLink":""
  },
  {
    "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
    "title":"Sidha velayutham",
    "position":"Founder & CEO",
    "instaLink":""
  },
  {
    "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img/sidha.png",
    "title":"Sidha velayutham",
    "position":"Founder & CEO",
    "instaLink":""
  },
]
//Sales start
  ngOnInit(): void {
  }

}
