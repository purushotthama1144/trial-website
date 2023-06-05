import { Component, ElementRef, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent implements OnInit {
  passwordHide: boolean = true;
  show: boolean = false;
  
  loginForm = new FormGroup ({
    emailId: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', Validators.required),
  
  })

  forgotPasswordForm = new FormGroup ({
    emailId: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', Validators.required),
  })

  constructor(private cookieService: CookieService , 
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router : Router) { }

  ngOnInit(): void {
  }
  
  passwordForm() {
    this.show = true
  }
  
  forgotPassword(){
    const forgotpassword = {
      'user_mail':this.forgotPasswordForm.value.emailId,
      'user_password':this.forgotPasswordForm.value.password
    }
    this.authService.forgotPassword(forgotpassword).subscribe((response) => { 
      if(response[0].includes("Login Details sent to")) {
        this.snackbarService.openSnackBar("mat-success", response[0]);
      }else {
        this.snackbarService.openSnackBar("mat-warn", response[0]);
      }
    } , (error)=> {
      console.log(error)
    })

  }

  loginFormSubmit() {
    this.show = false
    const formData = {
      'user_mail':this.loginForm.value.emailId,
      'user_password':this.loginForm.value.password
    }
    this.authService.formLogin(formData).subscribe((response)=>{
      if(response.session_id){
        this.cookieService.set('session_id', response.session_id);
        this.router.navigate(['/unlock/user-dashboard']);
        this.dialog.closeAll();
      }
      else{
        this.snackbarService.openSnackBar("mat-warn", response[0]);
      }
    },(error)=>{
      this.snackbarService.openSnackBar("mat-warn", error.error);
    })
  }
}
