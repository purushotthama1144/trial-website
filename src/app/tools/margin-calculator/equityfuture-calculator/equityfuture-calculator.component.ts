import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CalculationModalComponent } from '../calculation-modal/calculation-modal.component';

import * as XLSX from 'xlsx';
import { CalculatorService } from 'src/app/service/calculator/calculator.service';
import { FaqService } from 'src/app/service/faq/faq.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from 'src/app/service/seo/seo.service';


@Component({
  selector: 'app-equityfuture-calculator',
  templateUrl: './equityfuture-calculator.component.html',
  styleUrls: ['./equityfuture-calculator.component.scss'],
  
})
export class EquityfutureCalculatorComponent implements OnInit {

  fileName = 'brokerage-equity-future.xlsx';

  exposure = 2;
  pageloader:boolean = false
  
  accordion: any[] = [] ;
  
  imgrtxtlcommodity = {
    image: "https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/future.png",
    alt:"Futures Margin Calculator",
    content: "It is an online tool to calculate margin required for Commodity futures contract (CRUDEOIL, ALUMINIUM, COPPER, GOLD etc.) So find out the carry forward margin (NRML), Intraday Margin without stop loss (MIS) and Intraday margin with Stop loss (BO & CO) for Trade Pro and Freedom 15 Plan at a single glance.",
    additionalCont: "Our core value is <b>trust and transparency</b>. We believe in creating experiences and value to sustain growth for our customers. We onboard and retain. At Alice Blue we work toward retaing our customers and expanding their portfolios."
  }

  displayedColumns: string[] = [
    'number',
    'scrip',
    'expiry',
    'lotsize',
    'price',
    'nrmlmargin',
    'mismargin',
    'comargin',
    'bomargin',
    'calc'
  ];

  calculatorData : any [] = [];
  downloadExcel : any [] = [];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog , 
    private calculatorService : CalculatorService , 
    private faqservice: FaqService , 
    private router: Router , private meta: Meta , 
    private seoService: SeoService , private title: Title) {}
  
  ngOnInit(): void {
    this.getCalculatorData(); 
    this.getfaq();
    this.getSeoData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //dialog
  openDialog(element: any) {
    const dialogRef = this.dialog.open(CalculationModalComponent,{
      data:{
        element
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  getCalculatorData() {
    this.pageloader = true
    const data = {
      "margin_calculator_type": "Index & Equity Future"
    }
    this.calculatorService.getCalculatorData(data)
      .subscribe((response: any) => { 
        this.calculatorData = response;
        setTimeout(() => {
          this.pageloader = false
        }, 200);
        this.downloadExcel = this.calculatorData
        this.refreshDataSource();
      }, (error) => {
       
    })
  }

  exportexcel(filterResult : any): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filterResult);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
			
  }

  refreshDataSource(){
    this.dataSource = new MatTableDataSource(this.calculatorData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getfaq(){
    const data = {
      "page_url": this.router.url
    }
    this.faqservice.fetchsinglePagefaq(data).subscribe((response: any) => {
      this.accordion = response[0] == 'No Data'?[]:response;
    } ,  (error) => {
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
