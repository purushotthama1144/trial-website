import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PopupComponent } from '../home/popup/popup.component';
import { RiseTicketComponent } from '../rise-ticket/rise-ticket.component';
import { ContactService } from '../service/open-an-account/contact.service';
import { PopupService } from '../service/popup/popup.service';
import { SeoService } from '../service/seo/seo.service';

interface marker {
  lat: number;
  lng: number;
  label: string;
  draggable: boolean;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  
})
export class ContactUsComponent implements OnInit {
  contactnumberOne : any = ''
  contactnumberTwo : any = ''
  pageloader: boolean = false
  contactDetails = []


  // google maps zoom level
  zoom: number = 5;

  activeBranchDetail: any = {};
  // initial center position for the map

  lat = 21.1458
  lng = 79.0882

  activeMarker: string = "";

  clickedMarker(label: string) {
    this.activeMarker = `${label}`;
    this.activeBranchDetail = this.branches.find(branch => branch.branch == this.activeMarker);
  }
  markers: marker[] = [];
  branches: any[] = []
  contact_name_one = "";
  contact_number_one = "";
  contact_name_two = "";
  contact_number_two = "";
  contact_name_three = "";
  contact_number_three = "";

  movetoPage = [
    {
      "name": "Bengaluru",
      "url":"/locate-us/Bengaluru"
    },
    {
      "name": "Chennai",
      "url":"/locate-us/chennai"
    },
    {
      "name": "Coimbatore",
      "url":"/locate-us/coimbatore"
    },
    {
      "name": "Delhi",
      "url":"/locate-us/delhi"
    },
    {
      "name": "Erode",
      "url":"/locate-us/erode"
    },
    {
      "name": "Hyderbad",
      "url":"/locate-us/hyderabad"
    },
    {
      "name": "Karur",
      "url":"/locate-us/karur"
    },
    {
      "name": "Kolkata",
      "url":"/locate-us/kolkata"
    },
    {
      "name": "Madurai",
      "url":"/locate-us/madurai"
    },
    {
      "name": "Mumbai",
      "url":"/locate-us/mumbai"
    },
    {
      "name": "Nagercoil",
      "url":"/locate-us/nagercoil"
    },
    {
      "name": "Nagpur",
      "url":"/locate-us/nagpur"
    },
    {
      "name": "Odisha",
      "url":"/locate-us/odisha"
    },
    {
      "name": "Patna",
      "url":"/locate-us/patna"
    },
    {
      "name": "Pune",
      "url":"/locate-us/pune"
    },
    {
      "name": "Trivandrum",
      "url":"/locate-us/trivandrum"
    },
  ]
  popup: any;

  constructor(public dialog: MatDialog , 
    private contactService : ContactService ,  
    private router: Router , 
    private meta: Meta, 
    private seoService: SeoService, 
    private title: Title,  
    private popupservice: PopupService) { }

  ngOnInit(): void {
    this.getContactDetailsDats()
    this.getSeoData()
    this.getPopupData()
  }
 
  openRiseTicket() {
    const dialogRef = this.dialog.open(RiseTicketComponent,{
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  first(data){
    return data.split("@")[0]
  }
  second(data){
    return data.split("@")[1]
  }
  
  getContactDetailsDats() {
    this.pageloader = true
    this.contactService.fetchContactDetails().subscribe((response) => {
      this.branches = response["branch_details"];
      this.markers = response["coordinates"];
      this.contactDetails = response["support_details"]
      this.lat = 21.1458;
      this.lng = 79.0882;
      this.activeMarker = "Nagpur";
      this.activeBranchDetail = this.branches.find(branch => branch.branch == this.activeMarker);
      setTimeout(() => {
        this.pageloader = false
      }, 300);
    })
  }

  getSeoData() {
    const data = {
      "page_url": `https://aliceblueonline.com${this.router.url}` 
    }
    this.seoService.createCanonicalURL();
    this.seoService.fetchSeoData(data).subscribe((response) => {
      
    this.meta.addTags([
      // { name: 'title' , content : response.meta_title ? response.meta_title : '' },
      { property: 'og:title' , content : response.og_title ? response.og_title : '' },
      { name: 'description' , content : response.meta_desc ? response.meta_desc : '' },
      { property: 'og:description', content: response.og_desc ? response.og_desc : '' },
      { property: 'og:image', content: response.og_image ? response.og_image : '' },
      { property: 'og:image:height', content: response.og_image_height ? response.og_image_height : '' },
      { property: 'og:image:width', content: response.og_image_width ? response.og_image_width : '' },
      { property: 'og:site_name', content: response.og_site ? response.og_site : '' },
      { property: 'og:type', content: response.og_type ? response.og_type : '' },
      { property: 'og:url', content: response.og_url ? response.og_url : '' },
      { name: 'twitter:title', content: response.twitter_title ? response.twitter_title : '' },
      { name: 'twitter:card', content: response.twitter_type ? response.twitter_type : '' },
      { name: 'twitter:site', content: response.twitter_site ? response.twitter_site : '' },
      { name: 'twitter:description', content: response.twitter_description ? response.twitter_description : '' },
      { name: 'twitter:image', content: response.twitter_image ? response.twitter_image : '' },
      { name: 'twitter:creator', content: response.twitter_handle ? response.twitter_handle : '' },
      { name: 'twitter:url', content: response.twitter_url ? response.twitter_url : '' },
    ]);
    this.title.setTitle(response.title);
    } , (error) => {
      console.log(error)
    })
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
