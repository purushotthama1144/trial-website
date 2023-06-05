import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AntService {

  constructor(private http: HttpClient) { }

  fetchAntData(data): Observable<any> {
    return this.http.post(`${environment.baseurl}ant/fetch-data`, data)
  }
}