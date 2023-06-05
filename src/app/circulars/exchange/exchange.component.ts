import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CircularsService } from 'src/app/service/circulars/circulars.service';
import { SeoService } from 'src/app/service/seo/seo.service';
@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  
})
export class ExchangeComponent implements OnInit {

  exchange: any[] = [];

  displayedColumns: string[] = [
    'date', 
    'exchange',
    'content', 
  ];

  dataSource: MatTableDataSource<any>;
  filterData: any[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private circularsService : CircularsService , private router: Router , private meta: Meta , private title: Title , private seoService : SeoService ) {
    this.filterData = this.exchange
  }

  ngOnInit(): void {
    this.getSeoData()
    this.getcircularData()
    this.dataSource = new MatTableDataSource(this.exchange);

    this.dataSource.paginator = this.paginator;
  }

  refreshDataSource(){
    this.dataSource = new MatTableDataSource(this.exchange);
    this.dataSource.paginator = this.paginator;
  }

  //Date Picker start
  applyFilter(event: any) {
    this.filterData = this.exchange.filter((data)=> new Date(data.date).toLocaleDateString() == new Date(event.value).toLocaleDateString())
   
    this.dataSource = new MatTableDataSource(this.filterData);
    this.dataSource.paginator = this.paginator;
  }

  getcircularData(){
    const data = {
      "circular_category":"Exchange"
    }
    this.circularsService.fetchCircularData(data).subscribe((response) => {

      this.exchange = response = response[0] == 'No Data'?[]:response.reverse();
       // date sort decending order
       this.exchange.sort((val1:any, val2:any)=> {
        return new Date(val2.date).getTime() - new Date(val1.date).getTime()
      })
      this.refreshDataSource()
    }, (error) => {
      console.log(error)
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

}
