import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private http : HttpClient) { }

  createPartnerAccount(payload): Observable<any>{
    return this.http.post(`${environment.baseurl}open-account/create-partner-account` , payload)
  }
}
