import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupComponent } from 'src/app/home/popup/popup.component';
import { PopupService } from 'src/app/service/popup/popup.service';

@Component({
  selector: 'app-trading-holiday',
  templateUrl: './trading-holiday.component.html',
  styleUrls: ['./trading-holiday.component.scss'],
  
})
export class TradingHolidayComponent implements OnInit {
  popup: any;
  constructor(private popupservice : PopupService , public dialog: MatDialog, private router: Router,) { }

  ngOnInit(): void {
    this.getPopupData()
  }

  getPopupData() {
    const data =  {
      "page_url":this.router.url == '/'?'/':this.router.url
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
