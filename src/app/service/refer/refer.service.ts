import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ReferService {

  constructor(private http : HttpClient) { }

  refer(payload): Observable<any> {
    return this.http.post(`${environment.baseurl}refer-us/submit-response` , payload)
  }
}