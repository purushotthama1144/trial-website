import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
     
    }

    if (event instanceof NavigationEnd) {
      if (this.router.url == '/margin-calculator/equity' || this.router.url.includes('antiq') || this.router.url.includes('support')) {
        setTimeout(() => {
        
        }, 1300);
      } else {
        
      }
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      if (this.router.url == '/margin-calculator/equity' || this.router.url.includes('antiq') || this.router.url.includes('support')) {
        setTimeout(() => {
          
        }, 1000);
      } else {
      }
    }
    if (event instanceof NavigationError) {
      if (this.router.url == '/margin-calculator/equity' || this.router.url.includes('antiq') || this.router.url.includes('support')) {
        setTimeout(() => {
         
        }, 1000);
      } else {
        
      }
    }
  }
}
