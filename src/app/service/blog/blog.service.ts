import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogData(data: any): Observable<any> {
    return this.http.post(`${environment.baseurl}blogs/fetch-details`, data)
  }

  getSpecificBlog(data: any): Observable<any> {
    return this.http.post(`${environment.baseurl}blogs/fetch-specific-blog`, data)
  }
  
  getRedirectData(data: any): Observable<any> {
    return this.http.post(`${environment.baseurl}redirect-url/fetch-data`, data)
  }

  blogCategories(data: any): Observable<any> {
    return this.http.post(`${environment.baseurl}blogs/fetch-blog-sub-categories`, data)
  }

  getBlogdataCategorywise(data: any): Observable<any> {
    return this.http.post(`${environment.baseurl}blogs/fetch-blog-category-wise`, data)
  }

  trendingBlogs(): Observable<any> {
    return this.http.post(`${environment.baseurl}blogs/trending-blogs`, {})
  }

  latestBlogs(): Observable<any> {
    return this.http.post(`${environment.baseurl}blogs/latest-blogs`, {})
  }

  mainBlogs(): Observable<any> {
    return this.http.post(`${environment.baseurl}blogs/main-blogs`, {})
  }

  subscribeSendMail(data: any): Observable<any> {
    return this.http.post(`${environment.baseurl}subscribe/send-mail`, data)
  }

  fetchCounter(data: any): Observable<any> {
    return this.http.post(`${environment.baseurl}reaction-counter/fetch-counter`, data)
  }

  insertReaction(data: any): Observable<any> {
    return this.http.post(`${environment.baseurl}reaction-counter/insert`, data)
  }

  fetchAuthorData(data: any): Observable<any> {
    return this.http.post(`${environment.baseurl}blogs/author-blogs`, data)
  }
}
