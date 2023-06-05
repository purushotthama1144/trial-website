import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http : HttpClient) { }

  getHomeData(): Observable<any>{
    return this.http.post(`${environment.baseurl}home-page/merged-details` , {})
  }
}
