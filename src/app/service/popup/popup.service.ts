import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  popup: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http : HttpClient) { }

  pagePop():Observable<boolean>{
    return this.popup.asObservable();
  }

  fetchpopupData(data: any): Observable<any>{
    return this.http.post(`${environment.baseurl}pop-up/pop-up-fetch` , data)
  }
}
