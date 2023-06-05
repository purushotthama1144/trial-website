import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private http : HttpClient) { }

  fetchtPricingData(data: any): Observable<any>{
    return this.http.post(`${environment.baseurl}pricing/fetch-data` , data)
  }
  
  fetchtPageData(): Observable<any>{
    return this.http.post(`${environment.baseurl}pricing/fetch-page-data` , {})
  }
}
