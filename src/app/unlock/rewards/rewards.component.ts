import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SnackbarService } from 'src/app/service/snackbar/snackbar.service';
import { UnlockService } from 'src/app/service/unlock/unlock.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss'],

})
export class RewardsComponent implements OnInit {
  sessionData: any;
  rewards: any = {};
  q: any;
  updatedResponse: boolean = false;
  objectKeys = Object.keys;
 
  isDragging: boolean = false;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    autoplay: true,
    autoplaySpeed: 1000,
    nav: true,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    responsive: {
      0: {
        items: 1
      },
      468: {
        items: 2
      },
      740: {
        items: 2
      },
      
    },
  }

  constructor(private cookie: CookieService , 
    private router : Router , 
    private unlockService : UnlockService ,
    private snackbarService : SnackbarService) { }



  ngOnInit(): void {
    if(this.cookie.check('session_id')){
      this.getUserSession()
    }
  }

  logout() {
    if(this.cookie.check('session_id')){
      this.cookie.delete('session_id' , '/');
      this.router.navigate(['/unlock'])
    }
  }

  getUserSession() {
    const sessionId = {
      "session_id": this.cookie.get('session_id')
    }
    this.unlockService.fetchUserSession(sessionId)
    .subscribe((response) => {
      if(response.cookie) {
        this.sessionData = response;
        this.getdashboardData()
      }else {
        this.snackbarService.openSnackBar("mat-warn", response[0]);
      }
    })
  }



  getdashboardData(){
    this.unlockService.fetchDashboardData().subscribe((response) => {
      this.rewards = response;
      for (let key in this.rewards.offers){
        this.rewards.offers[key].forEach((offer)=>{
          offer['checked'] = false;
        })
      }
      this.rewards.topics.forEach((topic)=>{
        topic['checked'] = false;
      })

      this.getUserResponse()
      
    },(error)=>{
      console.log(error)
    })
  }

  getUserResponse() {
    const fetchUser = {
      "session_id":this.cookie.get('session_id')
    }
    this.unlockService.fetchUserResponse(fetchUser).subscribe((response) => {

      if(response[0] == 'No Data')
      {
        this.updatedResponse = false;
      }
      else{
        this.checkedIds = response
        this.updatedResponse = true;
        response.forEach((res)=>{
          for (let key in this.rewards.offers){
            this.rewards.offers[key].forEach((offer)=>{
              if(res == offer.id){
                offer['checked'] = true;
              }
            })
          }
          this.rewards.topics.forEach((topic)=>{
            if(res == topic.id){
              topic['checked'] = true;
            }
          })
        })
      }
    })
  }

  checkedIds = []
  check(data){
    data.checked = !data.checked;
    if(data.checked){
      this.checkedIds.push(data.id)
    }
    else{
      this.checkedIds.splice(this.checkedIds.findIndex((checkId)=>checkId == data.id),1);
    }
  }

  updateUserResponseData(){
    const updateUser = {
      "session_id":this.cookie.get('session_id'),
      "user_response":this.checkedIds
    }
    this.unlockService.updateUserResponse(updateUser).subscribe((response)=> {
      this.snackbarService.openSnackBar("mat-success", response[0]);
    })
  }

  createUserResponseData(){
    const createUser = {
      "session_id":this.cookie.get('session_id'),
      "user_response":this.checkedIds
    }
    this.unlockService.createUserResponse(createUser).subscribe((response)=> {
      this.snackbarService.openSnackBar("mat-success", response[0]);
      this.getUserResponse()


    })
  }
}
