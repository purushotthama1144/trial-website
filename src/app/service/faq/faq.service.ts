import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) { }

  fetchFaqs(): Observable<any> {
    return this.http.post(`${environment.baseurl}faqs/fetch-faqs`, {})
  }

  fetchSpecificFaq(payload: any): Observable<any> {
    return this.http.post(`${environment.baseurl}faqs/fetch-specific-faq`, payload)
  }

  insertLikeDislike(payload: any): Observable<any> {
    return this.http.post(`${environment.baseurl}like-dislike-counter/insert`, payload)
  }

  fetchLikeDislike(payload: any): Observable<any> {
    return this.http.post(`${environment.baseurl}like-dislike-counter/fetch`, payload)
  }

  searchFaqs(): Observable<any>{
    return this.http.post(`${environment.baseurl}faqs/fetch-search-faqs`, {})
  }
  
  fetchsinglePagefaq(data): Observable<any>{
    return this.http.post(`${environment.baseurl}page-faq/fetch-faqs`, data)
  }

  fetchHelpdeskfaqlink(): Observable<any>{
    return this.http.post(`${environment.baseurl}faqs/top-categories`, {})
  }
}