import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SeoService } from '../service/seo/seo.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  
})
export class PrivacyPolicyComponent implements OnInit {
  pageloader: boolean = true
  policies = [
    "This Privacy Policy statement is applicable to Alice Blue. Alice Blue does not collect personal information about individuals except when such individuals specifically provide such information on a voluntary basis. The privacy and protection of your data and information provided to us are of vital importance, we are strongly committed to protecting the personal and financial information that you submit to us.",
    
    "Personal information of individual users will not be sold or otherwise transferred to unaffiliated third parties without your approval at the time of collection.",
    
  "To enable us to serve you better, it is necessary that your personal information available with us is updated and accurate. You can also send us an e-mail to <a href='email:askus@aliceblueindia.com'>askus@aliceblueindia.com</a> and we shall ensure that your informationis updated and protected from any misuse or unauthorized revelation.",
    
    "We share information as part of normal business operations, such as providing you with any services to which you subscribe, any activity related to these services and informing you about these services.",
    
    "Our website contains links to other web sites, and Alice Blue would not be responsible for the privacy practices or the content of such Web sites."
  ]

  passwordPolicy = [
    "To help us to protect your privacy by maintaining the secrecy of the username and password you use for any of our services."
  ]
  changeInPolicy = [
    "Alice Blue reserves the right to change or update this Privacy Policy or any other of our Policies/Practices at any time. The same shall be notified to you by posting such changes or updated Private Policy on the page. Any changes or updates will be effective immediately upon posting to this web site."
  ]
  obligation = [
    "Please note that this Privacy Policy does not create any contractual or other legal rights in or on behalf of any party, nor is it intended to do so."
  ]

  constructor(private router: Router , private meta: Meta , private seoService: SeoService , private title: Title) { }

  ngOnInit(): void {
    this.getSeoData()
    setTimeout(() => {
      this.pageloader = false
    }, 300);
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
