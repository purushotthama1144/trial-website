import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UnlockService {

  constructor(private http : HttpClient) { }

  fetchUnlockHomeData(): Observable<any>{
    return this.http.post(`${environment.baseurl}unlock/fetch-homepage-data` , {} )
  }
  
  fetchQuizData(): Observable<any>{
    return this.http.post(`${environment.baseurl}unlock/fetch-quiz-data` , {} )
  }

  fetchNextResponse(data: any): Observable<any>{
    return this.http.post(`${environment.baseurl}unlock/insert-user-response` , data )
  }

  fetchPrevResponse(data: any): Observable<any>{
    return this.http.post(`${environment.baseurl}unlock/user-previous-response` , data )
  }
  
  fetchSubmitData(data: any): Observable<any>{
    return this.http.post(`${environment.baseurl}unlock/user-quiz-submit` , data )
  }

  fetchUserVerificationData(data: any): Observable<any>{
    return this.http.post(`${environment.baseurl}unlock/verify-user-details` , data )
  }

  fetchUserSession(sessionId):Observable<any>{
    return this.http.post(`${environment.baseurl}unlock/fetch-user-session`, sessionId)
  }

  fetchDashboardData():Observable<any>{
    return this.http.post(`${environment.baseurl}unlock/fetch-dashboard-offers`, {})
  }

  fetchUserResponse(fetchUser):Observable<any>{
    return this.http.post(`${environment.baseurl}unlock/fetch-user-offer-response`, fetchUser)
  }

  createUserResponse(createUser):Observable<any>{
    return this.http.post(`${environment.baseurl}unlock/create-user-offer-response`, createUser)
  }

  updateUserResponse(updateUser):Observable<any>{
    return this.http.post(`${environment.baseurl}unlock/update-user-offer-response`, updateUser)
  }

}
