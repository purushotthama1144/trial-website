import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http: HttpClient) { }

  getCareerData(): Observable<any> {
    return this.http.post(`${environment.baseurl}career/fetch-details`, {})
  }
  
  careeDetailfetch(data:any): Observable<any> {
    return this.http.post(`${environment.baseurl}career/fetch-specific-details`, data)
  }

  resumeUpload(payload): Observable<any> {
    return this.http.post(`${environment.baseurl}career/send-resume`, payload)
  }
  
}

