import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog/blog.service';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss'],
  
})
export class FooterMenuComponent implements OnInit {
  referDrop:boolean = false;
  supportDrop:boolean = false;
  educationDrop:boolean = false;
  
  blogUrls = [
    {
      "meta_title":`IOC Meaning in Stock Market`,
      "redirect_url":"ioc-in-share-market"
    },
    {
      "meta_title":`Open trading & demat account`,
      "redirect_url":"open-demat-trading-account"
    },
    {
      "meta_title":`What is Demat Account`,
      "redirect_url":"what-is-demat-account"
    },
    {
      "meta_title":`Best Demat Account in India`,
      "redirect_url":"best-demat-account-in-india"
    },
    {
      "meta_title":`Best Trading Account in India`,
      "redirect_url":"best-trading-account-in-india"
    },
    {
      "meta_title":`What is Trading Account`,
      "redirect_url":"what-is-trading-account"
    },
    {
      "meta_title":`Difference between Demat & Trading Account`,
      "redirect_url":"demat-vs-trading-account"
    },
    {
      "meta_title":`How To Find Demat Account Number`,
      "redirect_url":"how-to-find-demat-account-number"
    },
    {
      "meta_title":`What is LTP in the Stock Market.`,
      "redirect_url":"what-is-ltp-in-share-market"
    },
    {
      "meta_title":`What is Equity Delivery`,
      "redirect_url":"equity-delivery"
    },
  ]

  constructor(private blogService: BlogService,
    private router: Router) { 
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
  }

  ngOnInit(): void {
    // this.getmainBlog()
  }

  // getmainBlog(){
  //   this.blogService.mainBlogs().subscribe((response: any) =>{
  //     this.blogUrls = response[0] == 'No Data'?[]:response;
  //   }, (error) => {
  //     console.log(error)
  //   })
  // }
  redirectBlog(url){
    this.router.navigate([url])
  }
}
