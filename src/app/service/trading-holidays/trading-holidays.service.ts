import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TradingHolidaysService {

  constructor(private http : HttpClient) { }

  fetchTradingHoliday(data: any): Observable<any>{
    return this.http.post(`${environment.baseurl}circular/fetch-trading-holdays` , data)
  }
}
