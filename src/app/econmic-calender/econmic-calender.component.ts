import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupComponent } from '../home/popup/popup.component';
import { PopupService } from '../service/popup/popup.service';
declare var economicCalendar:any

@Component({
  selector: 'app-econmic-calender',
  templateUrl: './econmic-calender.component.html',
  styleUrls: ['./econmic-calender.component.scss'],
  
})
export class EconmicCalenderComponent implements OnInit {

  url = this.router.url;
  popup : any;
  constructor( public dialog: MatDialog , private popupservice: PopupService , private router: Router) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    new economicCalendar({ width: "100%", height: "100%", mode: 2 });
  }

  getPopupData() {
    const data =  {
      "page_url":this.url == '/'?'/':this.url
    }
    this.popupservice.fetchpopupData(data).subscribe((response) => {
      this.popup = response[0] == 'No Data'?null:response;
      if(this.popup != null){
        this.dialog.open(PopupComponent, {
          data : {
            data : this.popup
          },
          disableClose: true,
          width: '30%',
panelClass: 'custom-modalbox',
          position: {
            bottom: '0px',
            left:'0px'
          }
        });
        setTimeout(()=>{
          this.dialog.closeAll()
        },5000)
      } else {
      
      }
    } , (error) => {
      console.log(error)
    })
  }

}
