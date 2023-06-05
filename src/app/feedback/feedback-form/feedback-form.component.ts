import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/service/feedback/feedback.service';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
  
})
export class FeedbackFormComponent implements OnInit {

  FeedbackForm = new FormGroup({
    email: new FormControl('', Validators.required),
    textarea: new FormControl('' , Validators.required),
  });
  
  @Input('title') title: string = "";
  @Input('category') category: string = "";
  @Input('desc') desc: string = "";
  recentPosts:any[] = [];

  constructor(private snackbarService: SnackbarService , private feedbackservice: FeedbackService) { }
  
  ngOnInit(): void {}
    
  onSubmit(anonymous?:string){
    const data = {
      "feedback_category": this.category, 
      "user_comment":this.FeedbackForm.value.textarea,
      "user_id": anonymous?'':this.FeedbackForm.value.email
    }
    
    this.feedbackservice.fetchFeedback(data).subscribe((response) => {
      this.snackbarService.openSnackBar("mat-primary", response[0]);
    }, (error) => {
      console.log(error)
    })
  }
}
