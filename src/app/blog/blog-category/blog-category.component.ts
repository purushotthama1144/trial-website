import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog/blog.service';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.scss'],
  
})
export class BlogCategoryComponent implements OnInit {
  sub_category: string = "";
  blogCategory: string = "";
  category:any;
  pageloader : boolean = false
  
  q: any;
  read_time : any;
  wordsPerMinute = 800;
  noOfWords : any;
  minutes : any;

  constructor(private blogService: BlogService,private route: ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.sub_category = params['subcategory'];
        if(this.sub_category){
          this.getBlogdataCategorywise(this.sub_category)
        }
      }
    )
  }

  calculateReadTime(body_text){
    this.noOfWords = body_text.match(/(\w+)/g).length;
    this.minutes = this.noOfWords / this.wordsPerMinute;
    this.read_time = Math.ceil(this.minutes);
    return this.read_time;
  }

  openBlogDetail(user: any) {
    // this.router.navigate(['antiq/',user.sub_category,user.redirect_url]);
    this.router.navigate([]) .then(res =>{window.open(`antiq/${user.sub_category}/${user.redirect_url}`,"_blank") });
  }

  getBlogdataCategorywise(sub_category) {
    this.pageloader = true;
    const data = {
      "category":"ANT IQ",
      "sub_category":sub_category
    }
    this.blogService.getBlogdataCategorywise(data)
      .subscribe((response: any) => {
        this.pageloader = false;
        this.category = response
      }, (error) => {
        console.log(error)
      })
  }
}
