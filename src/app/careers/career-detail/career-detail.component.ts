import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from 'src/app/service/career/career.service';
import { SeoService } from 'src/app/service/seo/seo.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.scss'],
  
})

export class CareerDetailComponent implements OnInit {
  id: string = "";
  resume: File;
  careerDetail: any;
  noSpecificCareer: boolean = false;
 
  // referDrop:boolean = false;
  // supportDrop:boolean = false;
  // educationDrop:boolean = false;

  description:boolean= true;
  about:boolean= false;
  qualification:boolean= false;
  
  constructor(private route: ActivatedRoute , private careerService : CareerService , private snackbarService : SnackbarService , private meta: Meta , private title: Title , private seoService : SeoService , private router : Router) { }

  careerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    emailId: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    Mobile: new FormControl('', Validators.required),
    resume: new FormControl('' ,  Validators.required),
    currentSalary: new FormControl('' ,  Validators.required),
  });

  ngOnInit(): void { 
    this.getSeoData()
    this.route.queryParams.subscribe(
      params => {
        this.id = params['id'];
      }
    )
    this.getSpecificCareer()
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  uploadResume(event){
    const fileSize = event.target.files[0].size / 1024 / 1024;
      if (fileSize > 5) {
        alert('File size exceeds 5 MB');
      } else {
        this.resume = event.target.files[0]
      }
  }

  getSpecificCareer() {
    const data = {
      "id": this.id
    }
    this.careerService.careeDetailfetch(data)
      .subscribe((response: any) => {
        if(response[0] == "No Data"){
          this.noSpecificCareer = true;
        }
        else{
          this.careerDetail = response;
        }
      }, (error) => {
        console.log(error)
      })
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('job_id',this.id)
    formData.append('candidate_name',this.careerForm.value.name)
    formData.append('candidate_mail',this.careerForm.value.emailId)
    formData.append('candidate_mobile',this.careerForm.value.Mobile)
    formData.append('candidate_salary',this.careerForm.value.currentSalary)
    formData.append('file',this.resume)

    this.careerService.resumeUpload(formData)
      .subscribe((response) => {
        this.snackbarService.openSnackBar("mat-primary", response[0]);
      }, (error) => {
        console.log(error)
        this.snackbarService.openSnackBar("mat-warn", error.error);
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
}
