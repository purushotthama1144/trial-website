import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http : HttpClient) { }

  fetchLocationData(data): Observable<any>{
    return this.http.post(`${environment.baseurl}location/fetch-location-data` , data)
  }
}
