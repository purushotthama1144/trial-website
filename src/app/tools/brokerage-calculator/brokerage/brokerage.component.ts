import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-brokerage',
  templateUrl: './brokerage.component.html',
  styleUrls: ['./brokerage.component.scss'],
  
})
export class BrokerageComponent implements OnInit {
  charges: any[] = [
    {"name":"EQ Intraday", "charge":"0.01%"},
    {"name":"EQ Delivery", "charge":"0.10%"},
    {"name":"Futures", "charge":"0.01%"},
    {"name":"Options", "charge":"20 per lot"},
    {"name":"Currencies", "charge":"10 per lot"},
    {"name":"Commodities", "charge":"0.01%"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
