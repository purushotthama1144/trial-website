import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private http : HttpClient , 
    @Inject(DOCUMENT) private dom , 
    private router : Router , 
    @Inject(PLATFORM_ID) private platformId: any) { }

  createCanonicalURL() {
    if (isPlatformBrowser(this.platformId)) { 
      if (location.href.includes('?')) { 
        var staticUrl = ""
        let link: HTMLLinkElement = this.dom.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.dom.head.appendChild(link);
        staticUrl = location.href.split('?C=')[0]
        link.setAttribute('href', staticUrl);
      } else {
        let link: HTMLLinkElement = this.dom.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.dom.head.appendChild(link);
        link.setAttribute('href', `https://aliceblueonline.com${this.router.url}`);
      }
    }
  }

  fetchSeoData(data: any): Observable<any>{
    return this.http.post(`${environment.baseurl}common-seo/fetch-data` , data)
  }
}
