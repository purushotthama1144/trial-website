import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DigilinkService {

  constructor(private http: HttpClient) { }

  digilinkClientData(): Observable<any> {
    return this.http.post(`${environment.baseurl}digilink-client/fetch-data`, {})
  }
}
