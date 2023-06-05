import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { BlogService } from '../service/blog/blog.service';
import { SnackbarService } from '../service/snackbar/snackbar.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
  
})
export class SubscribeComponent implements OnInit {
  msg: string ="";
  
  subscribeEmail: boolean = false;
  
  subscribeForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
  })

  constructor(private blogService: BlogService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    
  }
  

  subscribe() {
    this.sendEmail()
  }

  sendEmail(){
    if(this.subscribeForm.valid) {
      this.subscribeEmail = true;
      const data = {
        "user_mail": this.subscribeForm.value.email
      }
      this.blogService.subscribeSendMail(data)
      .subscribe((response) => {
        if(response[0].includes(`Verification mail sent to`)){
          this.msg = response[0];
        }else{
          this.snackbarService.openSnackBar("mat-warn", response[0]);
        }
        this.subscribeEmail = false;
      }, (error) => {
        this.subscribeEmail = false;
        this.snackbarService.openSnackBar("mat-warn", "Failed");
      })
    }
  }
}
