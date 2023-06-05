import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PivotPointService {

  constructor(private http : HttpClient) { }

  getPivotpointData(data: any): Observable<any>{
    return this.http.post(`${environment.baseurl}pivot-point/fetch-details` , data)
  }
}