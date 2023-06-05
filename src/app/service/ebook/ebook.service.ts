import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EbookService {

  constructor(private http :HttpClient) { }

  fetchEbookList(): Observable<any>{
    return this.http.post(`${environment.baseurl}ebook/all-ebooks-list` , {})
  }
  
  fetchSpecificEbook(data: any): Observable<any>{
    return this.http.post(`${environment.baseurl}ebook/fetch-specific` , data)
  }

  fetchEbookFormData(payload): Observable<any>{
    return this.http.post(`${environment.baseurl}ebook/submit-user-data` , payload)
  }

  fetchCallbackFormData(payload): Observable<any>{
    return this.http.post(`${environment.baseurl}ebook/callback-request` , payload)
  }

  fetchFilterData(): Observable<any>{
    return this.http.post(`${environment.baseurl}ebook/filter-data` , {})
  }
}
