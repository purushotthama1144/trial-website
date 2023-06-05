import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rms-update',
  templateUrl: './rms-update.component.html',
  styleUrls: ['./rms-update.component.scss'],
  
})
export class RmsUpdateComponent implements OnInit {
  
  navLinks: any[];
  pageloader:boolean = true
  constructor(private router: Router , private route : ActivatedRoute) {
    
    this.navLinks = [
      {
        label: 'Exposures',
        link: './exposures',
      }, 
      {
        label: 'Ban Symbols',
        link: './ban-symbols',
      }, 
      // {
      //   label: 'Span Margin',
      //   link: '/margin-calculator/commodity',
      // }, 
      {
        label: 'Square ofF Contract',
        link: './expiry-contracts',
      },  
      {
        label: 'Tender Period Contracts',
        link: './tender-period-contract',
      },
      {
        label: 'RMS Update',
        link: './rms-updates',
      },
      {
        label: 'Blocked Scrips',
        link: './blocked-scrips',
      },
    ];
  }
 
  ngOnInit(): void {
    setTimeout(() => {
      this.pageloader = false
    }, 300);
  }
  
}
