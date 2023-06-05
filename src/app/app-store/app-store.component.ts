import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PopupComponent } from '../home/popup/popup.component';
import { AppStoreService } from '../service/app-store/app-store.service';
import { PopupService } from '../service/popup/popup.service';

@Component({
  selector: 'app-app-store',
  templateUrl: './app-store.component.html',
  styleUrls: ['./app-store.component.scss'],
  
})
export class AppStoreComponent implements OnInit {
  isDragging:boolean = true;
  pageloader:boolean = false
  exclusiveBenefits: any[] = [];
  featuredTradestore: any[] = [];
  url = this.router.url;
  popup : any;
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    autoplay: true,
    autoplaySpeed: 1000,
    margin:20,
    nav: true,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    responsive: {
      0: {
        items: 1
      },
      468: {
        items: 2,
        margin:20
      },
      768: {
        items: 2
      },
      
    },
  }

  constructor(private router : Router , public dialog: MatDialog , private popupservice: PopupService , private appstoreService: AppStoreService ,) { }

  ngOnInit(): void {
    
    this.getApps()
    this.getPopupData()
  }

  getApps(){
    this.pageloader = true
    this.appstoreService.fetchApps().subscribe((response: any) => {
      this.featuredTradestore = response['Featured Trade Store Apps']
      this.exclusiveBenefits = response['Main']
      setTimeout(() => {
        this.pageloader = false
      }, 300);
    } , (error) => {
      console.log(error)
    })
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
