import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HtmlPageService {

  constructor(private http: HttpClient) { }

  fetchHtmlData(data : any): Observable<any> {
    return this.http.post(`${environment.baseurl}html-page/fetch-data`, data)
  }
}
