import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http : HttpClient) { }

  createClientAccount(payload): Observable<any>{
    return this.http.post(`${environment.baseurl}open-account/create-client-account` , payload)
  }
  
  fetchContactImage(): Observable<any>{
    return this.http.post(`${environment.baseurl}open-account/fetch-popup-image` , {})
  }
  fetchContactDetails(): Observable<any>{
    return this.http.post(`${environment.baseurl}contact-us/fetch-data` , {})
  }
  
  digipromoAccount(payload): Observable<any>{
    return this.http.post(`${environment.baseurl}open-account/digi-promo` , payload)
  }

  riseTicket(payload): Observable<any> {
    return this.http.post(`${environment.baseurl}raise-ticket/insert-data` , payload)
  }
}
