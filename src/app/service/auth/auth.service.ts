import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
  
  formLogin(formData):Observable<any>{
    return this.http.post(`${environment.baseurl}unlock/form-login`, formData)
  }
  
  forgotPassword(forgotpassword):Observable<any> {
    return this.http.post(`${environment.baseurl}unlock/form-forget-password`, forgotpassword)
  }
}
