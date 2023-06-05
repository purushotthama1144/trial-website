import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  fetchFeedback(data: any): Observable<any> {
    return this.http.post(`${environment.baseurl}user-feedback/submit-response`, data)
  }
}
