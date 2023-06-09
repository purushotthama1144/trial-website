import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {

  constructor(private http : HttpClient) { }

  fetchallPodcastData(): Observable<any>{
    return this.http.post(`${environment.baseurl}podcast/fetch-all-data` , {})
  }
}
