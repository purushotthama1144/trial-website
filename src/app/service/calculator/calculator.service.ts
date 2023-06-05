import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http : HttpClient) { }

  getCalculatorData(data: any): Observable<any>{
    return this.http.post(`${environment.baseurl}margin-calculator/fetch-details` , data)
  }
}
