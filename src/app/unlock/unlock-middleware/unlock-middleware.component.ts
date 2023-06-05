import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-unlock-middleware',
  template: '',
})
export class UnlockMiddlewareComponent implements OnInit {
    
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private cookie: CookieService) { }
  
  ngOnInit(): void {
    this.getAuthCode();
  }

  getAuthCode() {
    this.route.queryParams.subscribe(params => {
      if (params['session_id']) {
        this.cookie.set('session_id', params['session_id']);
        this.router.navigate(['/unlock/user-dashboard'])
      }
    });
  }
}
