import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PopupComponent } from 'src/app/home/popup/popup.component';
import { AntService } from 'src/app/service/ant/ant.service';
import { PopupService } from 'src/app/service/popup/popup.service';
import { SeoService } from '../../service/seo/seo.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  
})
export class ProductsComponent implements OnInit {
  produtData : any = {}
  isDragging: boolean = false;
  
  pageloader: boolean = false;

  customSalesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    // autoplay: true,
    autoplaySpeed: 1000,
    margin: 40,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      468: {
        items: 2,
        margin:20
      },
      768: {
        items: 3
      }
    }
  }
  antDashboard: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    items: 1,
    autoplaySpeed: 1000,
    margin: 40,
    navText: ['<span class="prev arrow arrow-left">', '<span class="arrow arrow-right next"></span>'],
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      468: {
        items: 1,
        margin:20
      },
      768: {
        items: 1
      }
    }
  }

  features = [
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/icons/Agile.png",
      "title":"Agile",
      "description":"Trade without interruptions thanks to our ultra light & fast backend.",
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/icons/Superior-Charts.png",
      "title":"Superior Charts",
      "description":"Advanced trading charts with innovative indicators and historical data.",
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/icons/Personalized-strategies.png",
      "title":"Personalised Strategies",
      "description":"Execute trades on ANT with your customized trading strategies,faster than ever.",
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/icons/Quick-monitoring.png",
      "title":"Quick & Easy Monitoring",
      "description":"Multiple charts, marketwatch, order book, and a lot more on a single screen.",
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/icons/Tab-market-watch.png",
      "title":"Live Marketwatch",
      "description":"ANT Mobi provides multiple marketwatch and live market depths.",
    },
    {
      "img":"https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/icons/Efficient-customer-care.png",
      "title":"Efficient Customer Care",
      "description":"Our 24x7 trained support staff provide you the best assistance for any trading queries",
    },
  ]
  url = this.router.url;
  popup : any;
  constructor(private router: Router , private meta: Meta , private seoService: SeoService , private title: Title , 
    private antService: AntService , private popupservice: PopupService , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSeoData()
    this.getAntData()
    this.getPopupData()
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

  getAntData() {
    this.pageloader = true
    const data = {
      "ant_type":"ant-home"
    }
    this.antService.fetchAntData(data).subscribe((response) => {
      this.produtData = response[0] == 'No Data'?[]:response;
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
