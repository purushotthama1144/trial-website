import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RmsService {

  
  constructor(private http : HttpClient) { }

  getRmsliveData(data: any): Observable<any>{
    return this.http.post(`${environment.baseurl}rms-calculator/fetch-details` , data)
  }
}
