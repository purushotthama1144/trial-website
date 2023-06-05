import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { UnlockService } from 'src/app/service/unlock/unlock.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  
})
export class QuizComponent implements OnInit {

  userResponse = []
  userQuestionResponse = []
  start_quiz: any;
  existingClient = ""

  passwordHide: boolean = true;
  
  show: boolean = true;
  not_show: boolean = false; 
  submit: boolean = false; 
  form: boolean = false; 
  formSubmitted: boolean = false; 
  questionForm: FormGroup;
  lastQuestion: number;

  question_types = [
    "Single Choice",
    "Multiple Choice"
  ]

  multiple_answer = []

  currentIndex: number = 0;
  currentQuestionSet: any;
  currentQuestionSetList: any;
  questionNumber : any;
  timeTaken : any;

  quizForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required , Validators.min(8)]),
  });

  constructor(private unlockService: UnlockService , 
    @Inject(PLATFORM_ID) private platformId: any,
    private snackbarService : SnackbarService) {}

  ngOnInit(): void {
  
  }
// start quiz
  startQuiz() {
    this.unlockService.fetchQuizData().subscribe((response) => {
      if(response[0] == "No Quiz is active"){
        this.snackbarService.openSnackBar("mat-warn", response[0]);
      } else {
        this.show = false;
        this.not_show = true;
        this.submit = false;
        this.form = false;
        this.start_quiz = response;
        this.currentQuestionSetList = this.start_quiz.quiz_data.unlock_quiz_questions;
        this.lastQuestion = this.currentQuestionSetList.length-1
     
        this.currentQuestionSet = this.start_quiz.quiz_data.unlock_quiz_questions[this.currentIndex];
      }
    }, (error) => {
      console.log(error)
    })
  }

  // quiz prev question
  prev_question() {
    const data = {
      "quiz_id":this.start_quiz.quiz_data.id,
      "question_id":this.start_quiz.quiz_data.unlock_quiz_questions[this.currentIndex - 1].id,
      "user_id":this.start_quiz.user_id,
    }
    this.unlockService.fetchPrevResponse(data)
    .subscribe((response)=>{
      if(response.user_response){
        this.userResponse = response.user_response;
        if(this.currentIndex) {
          this.currentIndex = this.currentIndex - 1;
          this.currentQuestionSet = this.currentQuestionSetList[this.currentIndex];
          if(this.currentQuestionSet && this.currentQuestionSet.question_options){
      
            this.currentQuestionSet.question_options.forEach((option)=>{
              option['checked'] = typeof(this.userResponse) == 'object'  && this.userResponse.find((res)=>res == option.value)?true:false;
            })
          }
        }
      } else {
        this.snackbarService.openSnackBar("mat-warn", response[0]);
      }
    },(error) => {
      console.log(error)
    })    
  }

// quiz next question
  next_question() {  
    const data = {
      "quiz_id":this.start_quiz.quiz_data.id,
      "question_id":this.start_quiz.quiz_data.unlock_quiz_questions[this.currentIndex].id,
      "user_id":this.start_quiz.user_id,
      "user_response":this.userResponse,
      "first_question_flag":"N"
    }
    
    this.unlockService.fetchNextResponse(data)
    .subscribe((response)=>{
      if(response.status == "success"){
        this.userResponse = []
        if(this.currentIndex < this.currentQuestionSetList.length -1 )
        {
          this.currentIndex = this.currentIndex + 1;
          this.currentQuestionSet = this.start_quiz.quiz_data.unlock_quiz_questions[this.currentIndex];
        }
        else
        {
          this.show = false;
          this.not_show = false;
          this.submit = true;
        }
      } else {
        this.snackbarService.openSnackBar("mat-warn", response[0]);
      }
    },(error) => {
      console.log(error)
    })
    
  }

  selectRadio(event: MatRadioChange){
    this.userResponse.push(event.value);
  }

  selectedCheckbox(event: any){
    if (event.checked) {
      this.userResponse.push(event.source.value);
    } else {
      let startn = this.userResponse.indexOf(event.source.value);
      this.userResponse.splice(startn, 1);
    }
  }

  // submit quiz questions and answers
  submit_quiz() {
    const data = {
      "quiz_id":this.start_quiz.quiz_data.id,
      "question_id":this.start_quiz.quiz_data.unlock_quiz_questions[this.currentIndex].id,
      "user_id":this.start_quiz.user_id,
      "user_response":this.userResponse,
      "first_question_flag":"N"
    }
    this.unlockService.fetchNextResponse(data)
    .subscribe((response)=>{
      if(response.status == "success"){
        
        const submitData = {
          "quiz_id":this.start_quiz.quiz_data.id,
          "user_id":this.start_quiz.user_id,
        }
        this.unlockService.fetchSubmitData(submitData).subscribe((response) => {
          this.show = false;
          this.not_show = false;
          this.submit = true;
          this.form = false;
          this.timeTaken = response
        },(error) => {
          console.log(error)
        })
        
      } else {
        this.snackbarService.openSnackBar("mat-warn", response[0]);
      }
    },(error) => {
      console.log(error)
    })
  }

  back() {
    this.show = false;
    this.not_show = false;
    this.submit = true;
    this.form = false;
  }

  checkExistingClient(check){
    this.existingClient = check
    this.show = false;
    this.not_show = false;
    this.submit = false;
    this.form = true;
  }
   
  clientForm() {
    if (isPlatformBrowser(this.platformId)) {
    this.formSubmitted = true
    const data = {
      "quiz_id":this.start_quiz.quiz_data.id,
      "user_id":this.start_quiz.user_id,
      "existing_client":this.existingClient,
      "email_id":this.quizForm.value.emailId,
      "user_password":this.quizForm.value.password,
      "resend_flag": "N"
    }

    this.unlockService.fetchUserVerificationData(data).subscribe((response) => {
      this.formSubmitted = false
      if(response.redirect_url) {
        window.open(response.redirect_url,"_self")
      } else {
        this.snackbarService.openSnackBar("mat-success", response[0]);
      }
    }, (error) => {
      console.log(error)
    })
  }
  }

  forgotPassword() {
    if (isPlatformBrowser(this.platformId)) {
    this.formSubmitted = true
    const data = {
      "quiz_id":this.start_quiz.quiz_data.id,
      "user_id":this.start_quiz.user_id,
      "existing_client":this.existingClient,
      "email_id":this.quizForm.value.emailId,
      "user_password":this.quizForm.value.password,
      "resend_flag": 'Y'
    }

    this.unlockService.fetchUserVerificationData(data).subscribe((response) => {
      this.formSubmitted = false
      if(response.redirect_url) {
        window.open(response.redirect_url,"_self")
      } else {
        this.snackbarService.openSnackBar("mat-success", response[0]);
      }
    }, (error) => {
      console.log(error)
    })
  }
  }
}
