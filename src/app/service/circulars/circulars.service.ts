import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CircularsService {

  constructor(private http: HttpClient) { }

  fetchCircularData(data): Observable<any> {
    return this.http.post(`${environment.baseurl}circular/fetch-all-circulars`, data)
  }
  
  fetchspecificCircular(data): Observable<any> {
    return this.http.post(`${environment.baseurl}circular/fetch-specific-circular`, data)
  }

}
