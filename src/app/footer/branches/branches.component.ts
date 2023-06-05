import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
  
})
export class BranchesComponent implements OnInit {
 
  branches: any[] = [
    {
      "branch": "Bengaluru",
      "link":"/locate-us"
    },
    {
      "branch": "Chennai",
      "link":"/locate-us"
    },
    {
      "branch": "Coimbatore",
      "link":"/locate-us"
    },
    {
      "branch": "Delhi",
      "link":"/locate-us"
    },
    {
      "branch": "Erode",
      "link":"/locate-us"
    },
    {
      "branch": "Hyderabad",
      "link":"/locate-us"
    },
    {
      "branch": "Karur",
      "link":"/locate-us"
    },
    {
      "branch": "Kolkata",
      "link":"/locate-us"
    },
    {
      "branch": "Madurai",
      "link":"/locate-us"
    },
    {
      "branch": "Mumbai",
      "link":"/locate-us"
    },
    {
      "branch": "Nagercoil",
      "link":"/locate-us"
    },
    {
      "branch": "Nagpur",
      "link":"/locate-us"
    },
    {
      "branch": "Odisha",
      "link":"/locate-us"
    },
    {
      "branch": "Patna",
      "link":"/locate-us"
    },
    {
      "branch": "Pune",
      "link":"/locate-us"
    },
    {
      "branch": "Trivandrum",
      "link":"/locate-us"
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  lowerCase(branch){
    return branch.toLowerCase()
  }

}
