import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadsService {

  constructor(private http :HttpClient) { }

  getDownloadData(data: any): Observable<any>{
    return this.http.post(`${environment.baseurl}downloads/fetch-details` , data)
  }

}
