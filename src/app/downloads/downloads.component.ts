import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
  
})
export class DownloadsComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;
  pageloader: boolean = true

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Account Opening',
        link: './account-opening',
        icon: 'https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Downloads/icons/account-opening.png'
      }, {
        label: 'User Manual',
        link: './user-manual',
        icon: 'https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Downloads/icons/user-manual.png'
      },{
        label: 'Softwares',
        link: './softwares',
        icon: 'https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Downloads/icons/policy.png'
      },{
        label: 'Policy',
        link: './policies',
        icon: 'https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Downloads/icons/policy.png'
      },{
        label: 'Other',
        link: './other',
        icon: 'https://alicewebsite.s3.ap-south-1.amazonaws.com/website/img-v2/Downloads/icons/other.png'
      },
    ];
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.pageloader = false
    }, 300);
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
