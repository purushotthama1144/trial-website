import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HowToVideosService {

  constructor(private http : HttpClient) { }

  fetchAllVideo(): Observable<any>{
    return this.http.post(`${environment.baseurl}how-to-videos/fetch-all` , {})
  }
  fetchAllTopic(data: any):Observable<any> {
    return this.http.post(`${environment.baseurl}how-to-videos/fetch-topics` , data)
  }
  fetchCategoryVideo():Observable<any> {
    return this.http.post(`${environment.baseurl}how-to-videos/fetch-topic-based-videos` , {})
  }
  fetchspecificVideodetails(data):Observable<any> {
    return this.http.post(`${environment.baseurl}how-to-videos/fetch-specific-details` , data)
  }
  fetchfilterData():Observable<any> {
    return this.http.post(`${environment.baseurl}how-to-videos/fetch-filter-data` , {})
  }
  fetchUrlSpecificDetails(data):Observable<any> {
    return this.http.post(`${environment.baseurl}how-to-videos/fetch-url-specific-details` , data)
  }
}