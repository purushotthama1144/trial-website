import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http : HttpClient) { }

  fetchComments(data): Observable<any> {
    return this.http.post(`${environment.baseurl}comments/fetch-comments` , data);
  }

  insertComment(data): Observable<any> {
    return this.http.post(`${environment.baseurl}comments/insert-comment` , data);
  }
}
