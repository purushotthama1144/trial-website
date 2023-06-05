import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupComponent } from 'src/app/home/popup/popup.component';
import { BlogService } from 'src/app/service/blog/blog.service';
import { PopupService } from 'src/app/service/popup/popup.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  
})
export class BlogListComponent implements OnInit {
  pageloader:boolean = false;
  popup : any;
  blogCategory: string = ""

  q: any;

  subcategories:any[] = []
  trendingBloglist:any[] = []
  latestBloglist:any[] = []
  blogData : any[] = []

  read_time : any;
  wordsPerMinute = 800;
  noOfWords : any;
  minutes : any;

  constructor(private router: Router, 
    private blogService: BlogService , 
    public dialog: MatDialog ,
    private popupservice: PopupService ,
    @Inject(PLATFORM_ID) private platformId: any,) { }

  ngOnInit(): void {
    this.getBlogContent()
    this.getBlogcategories()
    this.gettrendingBlogs()
    this.getlatestBlogs()
    this.getPopupData()
  }

  openBlogDetail(user: any) {
    // this.router.navigate(['/antiq/',user.sub_category,user.redirect_url] );
    if (isPlatformBrowser(this.platformId)) { 
      this.router.navigate([]).then(res =>{window.open(`antiq/${user.sub_category}/${user.redirect_url}`,"_blank") });
    }
  }

  getBlogContent() {
    this.pageloader = true;
    const data = {
      "category": "ANT IQ"
    }

    this.blogService.getBlogData(data).subscribe((response: any) => {
      this.blogData = response[0] == 'No Data'?[]:response.reverse();
      setTimeout(() => {
        this.pageloader = false
      }, 200);
    }, (error) => {
      console.log(error)
    })
  }
  
  
  //Read Time Calculation     
  calculateReadTime(body_text){
    this.noOfWords = body_text.match(/(\w+)/g).length;
    this.minutes = this.noOfWords / this.wordsPerMinute;
    this.read_time = Math.ceil(this.minutes);
    return this.read_time;
  }
  
  getBlogcategories(){
    const data = {
      "category": "ANT IQ"
    }
    this.blogService.blogCategories(data)
      .subscribe((response: any) => {
        this.subcategories = response[0] == 'No Data'?[]:response;
        this.subcategories = this.subcategories.filter((sub)=>sub.sub_category!=null)
      }, (error) => {
        console.log(error)
      })
  }

  gettrendingBlogs(){
    this.blogService.trendingBlogs().subscribe((response: any) =>{
      this.trendingBloglist = response[0] == 'No Data'?[]:response;
    }, (error) => {
      console.log(error)
    })
  }

  getlatestBlogs(){
    this.blogService.latestBlogs().subscribe((response: any) =>{
      this.latestBloglist = response[0] == 'No Data'?[]:response;
    }, (error) => {
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
