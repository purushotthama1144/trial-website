import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {

  constructor(private http: HttpClient) { }

  fetchApps(): Observable<any> {
    return this.http.post(`${environment.baseurl}app-store/fetch-apps`, {})
  }
}
