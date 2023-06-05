import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog/blog.service';

@Component({
  selector: 'app-author-blog',
  templateUrl: './author-blog.component.html',
  styleUrls: ['./author-blog.component.scss'],
  
})
export class AuthorBlogComponent implements OnInit {
  blogData: any = {}
  q: any;
  author_name : string = "";
  loading: boolean = false;
  pageloader: boolean = false;
  read_time : any;
  wordsPerMinute = 800;
  noOfWords : any;
  minutes : any;

  constructor(private blogService :  BlogService , private router : Router , private route : ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.author_name = params['author_url'];
        if(this.author_name){
          this.getBlogContent()
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
    this.router.navigate(['/antiq/',user.sub_category,user.redirect_url]);
  }

  getBlogContent() {
    this.pageloader = true;
    const data = {
      "author_url": this.author_name,
      "category":"ANT IQ"
    }
    this.blogService.fetchAuthorData(data).subscribe((response: any) =>{
      this.blogData = response[0] == 'No Data'?[]:response;
      setTimeout(() => {
        this.pageloader = false;
      }, 300);
    }, (error) => {
      console.log(error)
    })
  }

}
