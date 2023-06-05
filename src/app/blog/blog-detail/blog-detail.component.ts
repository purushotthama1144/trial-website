import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommentsService } from 'src/app/service/comments/comments.service';
import { MatDialog } from '@angular/material/dialog';
import { CommentsModalComponent } from './comments-modal/comments-modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { BlogService } from 'src/app/service/blog/blog.service';
import { Meta, Title } from '@angular/platform-browser';
import { InteractionService } from 'src/app/service/interaction/interaction.service';
import { SeoService } from 'src/app/service/seo/seo.service';
import { isPlatformBrowser } from '@angular/common';
import * as $ from 'jquery';
declare var $: $

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  
})
export class BlogDetailComponent implements OnInit {

  @ViewChild("wordLength") wordLength: ElementRef;
  wordCount: any;

  title: string = "";

  noSpecificBlog: boolean = false;
  pageloader: boolean = false;
  trendingBloglist:any[] = []
  // shareLink = `https://app.aliceblueonline.com/openaccount.aspx?C=undefined`
  scrolled: boolean = false;
  counter: any;
  comments: any[] = []
  user: any;
  read_time: any;
  wordsPerMinute = 800;
  noOfWords: any;
  minutes: any;

  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    checkbox: new FormControl(false, Validators.required),
  });

  clientCode: string = "";
  copyLink: string = ""
  shareLinkOne = `https://aliceblueonline.com/open-account-fill-kyc-request-call-back?c=undefined`

  facebook_text = `Would highly recommend checking out Alice Blues ANTMobi App for trading & investing. Open an account & get lifetime free equity delivery trades. A must-try is their unique Trade Store App which is just a bundle of surprises! Join using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`
  twitter_text = `Check out Alice Blues ANTMobi App for trading & investing. Open an account using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`
  telegram_text = `Hi, check out Alice Blue. I strongly recommend trying their platform for Investments. You can open an account and invest using their ANTMobi app. A must-try is their unique Trade Store App which is just a bundle of surprises! Join using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`
  linkedin_text = `Would highly recommend checking out Alice Blues ANTMobi App for trading & investing. Open an account & get lifetime free equity delivery trades. A must-try is their unique Trade Store App which is just a bundle of surprises! Join using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`
  whatsapp_text = `Hi, check out Alice Blue. I strongly recommend trying their platform for Investments. You can open an account and invest using their ANTMobi app. A must-try is their unique Trade Store App which is just a bundle of surprises! Join using my link and get a 10% cashback on brokerage for 30 days! Best of investing, Click and Join now`

  constructor(private route: ActivatedRoute,
    private meta: Meta,
    private metaTitle: Title,
    private commentsService: CommentsService,
    @Inject(PLATFORM_ID) private platformId: any,
    private blogService: BlogService,
    private interactionService: InteractionService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    private router: Router,
    private seoService: SeoService) { }

  ngOnInit(): void {
    this.gettrendingBlogs()
    this.route.params.subscribe(
      params => {
        this.title = params['title']
        this.getSpecificBlog()
      })

    this.fetchComments();
    
    var that = this;

    if (isPlatformBrowser(this.platformId)) {
      $(window).scroll(function () {
        if ($(document).scrollTop() > 2100) {
          $('.blog_detail_view .form_block').addClass('fixed');
        } else {
          $('.blog_detail_view .form_block').removeClass('fixed');
        }

        if ($(document).scrollTop() > 1300) {
          $('.blog_category .form_block').addClass('fixed');
        } else {
          $('.blog_category .form_block').removeClass('fixed');
        }
      });
      $(document).ready(function () {
        setTimeout(function () {
          $(".e-rte-table").wrap("<div class='table-outer'></div>");
        }, 1500)
      })
      setTimeout(function () {
        $(".e-rte-table").wrap("<div class='table-outer'></div>");
      }, 1500);

      $(document).on('click', '.actions', function (this: any) {
        $(this).parent().parent().parent().attr("data-id")
        that.openDialog($(this).parent().parent().parent().attr("data-id"));
      });
      
    }
    
  }

  generateLink() {
    if (this.clientCode) {
      this.snackbarService.openSnackBar("mat-primary", "Generated link Successfully");
      this.copyLink = `https://aliceblueonline.com/open-account-fill-kyc-request-call-back?c=${this.clientCode}`;
      this.shareLinkOne = this.copyLink
    }
    else {
      this.snackbarService.openSnackBar("mat-warn", "Please enter Client/Franchise code and then proceed");
    }

  }
  /* To copy Text from Textbox */
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.snackbarService.openSnackBar("mat-primary", "Link Copied Successfully");
  }

  openBlogDetail(user: any) {
    // this.router.navigate(['/antiq/',user.sub_category,user.redirect_url] );
    if (isPlatformBrowser(this.platformId)) { 
      this.router.navigate([]).then(res =>{window.open(`antiq/${user.sub_category}/${user.redirect_url}`,"_blank") });
    }
  }

  getSpecificBlog() {
    this.pageloader = true;
    if (isPlatformBrowser(this.platformId)) {
      const data = {
        "redirect_url": this.title
      }
      this.blogService.getSpecificBlog(data)
        .subscribe((response: any) => {
          this.pageloader = false;
          if (response[0] == "No Data") {
            this.noSpecificBlog = true;
          }
          else if (response.redirect_url) {
            const redirectData = {
              "redirect_url": this.router.url.split('/')[1]
            }
            this.blogService.getRedirectData(redirectData)
              .subscribe((redirectResponse: any[]) => {
                this.pageloader = false;
                let obj = redirectResponse.find(o => o.original_url == this.router.url);
                if (typeof obj != 'undefined') {
                  this.interactionService.interactionSelected.emit(true);
                  this.noSpecificBlog = false;
                  window.open(obj.redirected_url, "_self")
                }
                else {
                  this.interactionService.interactionSelected.emit(true);
                  this.noSpecificBlog = false;
                  // window.open(`https://old.aliceblueonline.com${this.router.url}`, "_self")
                  this.router.navigate(['/page-not-found'])
                }

              }, (error) => {
                console.log(error)
              })
          }
          else {
            this.meta.addTags([
              // { name: 'title', content: response.meta_title },
              { name: 'description', content: response.meta_description },
              { property: 'og:title', content: response.meta_title },
              { property: 'og:description', content: response.meta_description },
              { property: 'og:site_name', content: `Alice Blue` },
              { property: 'og:image', content: response.banner_image },
              { property: 'og:image:width', content: '1280' },
              { property: 'og:image:height', content: '720' },
              { property: 'og:locale', content: 'en_US' },
              { property: 'og:type', content: 'article' },
              { property: 'og:url', content: `https://aliceblueonline.com${this.router.url}` },
              { property: 'ya:ovs:upload_date', content: response.date },
              { name: 'twitter:card', content: 'summary_large_image' },

            ]);
            this.seoService.createCanonicalURL();
            this.metaTitle.setTitle(response.meta_title);
            this.user = response;
            this.fetchCounter()

            // Read time for articles
            this.noOfWords = response.body_text.match(/(\w+)/g).length;

            this.minutes = this.noOfWords / this.wordsPerMinute;
            this.read_time = Math.ceil(this.minutes);
          }
        }, (error) => {
          console.log(error)
        })
    }
  }

  gettrendingBlogs(){
    this.blogService.trendingBlogs().subscribe((response: any) =>{
      this.trendingBloglist = response[0] == 'No Data'?[]:response;
    }, (error) => {
      console.log(error)
    })
  }

  jqueryComments() {
    const comments = this.comments;
    if (isPlatformBrowser(this.platformId)) {
      $(document).ready(function () {
        $('#comments-container').comments({
          profilePictureURL: comments && comments[0] && comments[0].profile_picture_url ? comments[0].profile_picture_url : "",
          getComments: function (success, error) {
            success(comments);
          }
        });
      });
    }
  }

  fetchComments() {
    const comments = {
      section: "ANT IQ",
      page_url: `https://aliceblueonline.com${this.router.url}`
    }
    this.commentsService.fetchComments(comments)
      .subscribe((response) => {
        if (response[0] != 'No comments') {
          this.comments = response;
        }
        this.jqueryComments();
      }, (error) => {
        console.log(error)
      })
  }

  fetchCounter() {
    const reaction = {
      "blog_id": this.user.id
    }
    this.blogService.fetchCounter(reaction)
      .subscribe((response) => {
        this.counter = response;
      }, (error) => {
        console.log(error)
      })
  }

  insertReaction(like_counter, heart_counter, sad_counter, angry_counter) {
    const reaction = {
      "blog_id": this.user.id,
      "like_counter": like_counter,
      "heart_counter": heart_counter,
      "sad_counter": sad_counter,
      "angry_counter": angry_counter
    }
    this.blogService.insertReaction(reaction)
      .subscribe((response) => {
        this.snackbarService.openSnackBar("mat-primary", response[0]);
        this.fetchCounter()
      }, (error) => {
        this.snackbarService.openSnackBar("mat-warn", error.error);
      })
  }

  openDialog(id) {
    const dialogRef = this.dialog.open(CommentsModalComponent, {
      data: { id },
      disableClose: true,
      minWidth: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onSubmit() {
    const comments = {
      user_name: this.commentForm.value.name,
      user_mail: this.commentForm.value.email,
      comment: this.commentForm.value.comment,
      checkbox: this.commentForm.value.checkbox,
      section: "ANT IQ",
      page_url: `https://aliceblueonline.com${this.router.url}`
    }
    this.commentsService.insertComment(comments)
      .subscribe((response) => {
        this.snackbarService.openSnackBar("mat-primary", response[0]);
      }, (error) => {
        this.snackbarService.openSnackBar("mat-warn", error.error);
      })
  }

  @HostListener("window: scroll", [])

  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled = window.scrollY > 520;
    }
  }

}
