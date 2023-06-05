import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnlockService } from 'src/app/service/unlock/unlock.service';

@Component({
  selector: 'app-unlock',
  templateUrl: './unlock.component.html',
  styleUrls: ['./unlock.component.scss'],

})
export class UnlockComponent implements OnInit {
  unlockData : any = {}
  pageloader:boolean = true
  constructor(private router : Router , private unlockService : UnlockService) { }

  ngOnInit(): void {
    this.getUnlockHomeData()
  }

  openQuiz() {
    this.router.navigateByUrl('/unlock/quiz');
  }
  
  getUnlockHomeData() {
    this.unlockService.fetchUnlockHomeData().subscribe((response)=>{
      setTimeout(() => {
        this.pageloader = false
      }, 300);
      this.unlockData = response;
    } , (error)=> {
      console.log(error)
    })
  }


}
