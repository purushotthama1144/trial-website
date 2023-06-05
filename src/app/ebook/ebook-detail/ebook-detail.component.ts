import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EbookService } from 'src/app/service/ebook/ebook.service';
import { SeoService } from 'src/app/service/seo/seo.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { ThankYouComponent } from '../thank-you/thank-you.component';

@Component({
  selector: 'app-ebook-detail',
  templateUrl: './ebook-detail.component.html',
  styleUrls: ['./ebook-detail.component.scss'],
  
})

export class EbookDetailComponent implements OnInit {
  scrolled: boolean = false;
  pageloader: boolean = false;
  pageurl: string = "";
  item: any = {};
  thankyou: any = {}

  states = [
    {value: 'Andhra Pradesh', viewValue: 'Andhra Pradesh'},
    {value: 'Arunachal Pradesh', viewValue: 'Arunachal Pradesh'},
    {value: 'Assam', viewValue: 'Assam'},
    {value: 'Bihar', viewValue: 'Bihar'},
    {value: 'Chandigarh', viewValue: 'Chandigarh'},
    {value: 'Delhi', viewValue: 'Delhi'},
    {value: 'Goa', viewValue: 'Goa'},
    {value: 'Gujarat', viewValue: 'Gujarat'},
    {value: 'Haryana', viewValue: 'Haryana'},
    {value: 'Himachal Pradesh', viewValue: 'Himachal Pradesh'},
    {value: 'Jammu and Kashmir', viewValue: 'Jammu and Kashmir'},
    {value: 'Jharkhand', viewValue: 'Jharkhand'},
    {value: 'Karnataka', viewValue: 'Karnataka'},
    {value: 'Kerala', viewValue: 'Kerala'},
    {value: 'Madhya Pradesh', viewValue: 'Madhya Pradesh'},
    {value: 'Maharashtra', viewValue: 'Maharashtra'},
    {value: 'Manipur', viewValue: 'Manipur'},
    {value: 'Meghalaya', viewValue: 'Meghalaya'},
    {value: 'Mizoram', viewValue: 'Mizoram'},
    {value: 'Nagaland', viewValue: 'Nagaland'},
    {value: 'Orissa', viewValue: 'Orissa'},
    {value: 'Punjab', viewValue: 'Punjab'},
    {value: 'Rajasthan', viewValue: 'Rajasthan'},
    {value: 'Sikkim', viewValue: 'Sikkim'},
    {value: 'Tamil Nadu', viewValue: 'Tamil Nadu'},
    {value: 'Telangana', viewValue: 'Telangana'},
    {value: 'Tripura', viewValue: 'Tripura'},
    {value: 'Uttarakhand', viewValue: 'Uttarakhand'},
    {value: 'West Bengal', viewValue: 'West Bengal'},
  ];
  
  ebookForm = new FormGroup({
    firstName: new FormControl('' , Validators.required),
    email: new FormControl('' ,  [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    Mobile: new FormControl('' , Validators.required),
    State: new FormControl('' , Validators.required),
  });

  formSubmitted:boolean = false

  constructor(private route: ActivatedRoute , 
    @Inject(PLATFORM_ID) private platformId: any, 
    private router: Router , 
    private meta: Meta, 
    private seoService: SeoService, 
    private title: Title , 
    public dialog: MatDialog ,
    private ebookService : EbookService ,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getSeoData()
    this.route.params.subscribe(
      params => {
        this.pageurl = params['pageurl'];
        if(this.pageurl) {
          this.fetchSpecificebook() 
        }
        else {
          this.router.navigate(['page-not-found'])
        }
      }
    )
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit(){
    this.formSubmitted = true;
    const payload = {
      "user_name": this.ebookForm.value.firstName,
      "email_id": this.ebookForm.value.email,
      "contact_no": this.ebookForm.value.Mobile,
      "state": this.ebookForm.value.State,
      "ebook_id": this.item.id
    }

    this.ebookService.fetchEbookFormData(payload)
      .subscribe((response) => {
        if(response &&  response[0] && (response[0].includes("Ebook Download link already sent to") || response[0].includes("Invalid"))){
          this.snackbarService.openSnackBar("mat-primary", response[0]);
        }
        else{
          this.thankyou = response
          this.formSubmitted = false
          const dialogRef = this.dialog.open(ThankYouComponent,{
            width: '80%',
            height:'67%',
            data : {
              element : this.thankyou
            }
          });
        }
      }, (error) => {
        this.snackbarService.openSnackBar("mat-warn", error.error);
        this.formSubmitted = false
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

  @HostListener("window: scroll", [])

  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) { 
      this.scrolled = window.scrollY > 120;
    }
  }

  fetchSpecificebook(){
    this.pageloader = true
    const data = {
      "ebook_page_url": this.pageurl
    }
    this.ebookService.fetchSpecificEbook(data).subscribe((response) => {
      setTimeout(() => {
        this.pageloader = false
      }, 300);
      this.item = response[0] == 'No Data'?{}: response;
    } , (error) => {
      console.log(error)
    })
  }
}
