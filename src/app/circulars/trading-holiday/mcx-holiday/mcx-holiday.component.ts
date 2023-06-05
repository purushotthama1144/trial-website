import { Component, OnInit } from '@angular/core';
import { TradingHolidaysService } from 'src/app/service/trading-holidays/trading-holidays.service';
declare var $: any;

@Component({
  selector: 'app-mcx-holiday',
  templateUrl: './mcx-holiday.component.html',
  styleUrls: ['./mcx-holiday.component.scss'],
  
})
export class McxHolidayComponent implements OnInit {

  mcxHolidays = [
    {
      "date":"Jan 01, 2021",
      "day":"Friday",
      "name":"New Year Day",
      "morningSession":"Open",
      "eveningSession":"Closed",
    },
    {
      "date":"Mar 11, 2021",
      "day":"Thursday",
      "name":"Mahashivratri",
      "morningSession":"Closed",
      "eveningSession":"Open",
    },
    {
      "date":"March 29, 2021",
      "day":"Monday",
      "name":"Holi",
      "morningSession":"Closed",
      "eveningSession":"Open",
    },
    {
      "date":"April 02, 2021",
      "day":"Friday",
      "name":"Good Friday",
      "morningSession":"Closed",
      "eveningSession":"Open",
    },
    {
      "date":"April 14, 2021",
      "day":"Wednesday",
      "name":"Dr.Babasaheb Ambedkar Jayanti",
      "morningSession":"Closed",
      "eveningSession":"Open",
    },
    {
      "date":"April 21, 2021",
      "day":"Wednesday",
      "name":"Ram Navami",
      "morningSession":"Closed",
      "eveningSession":"Open",
    },
    {
      "date":"May 13, 2021",
      "day":"Thursday",
      "name":"Id-Ul-Fitr (Ramzan Id)",
      "morningSession":"Closed",
      "eveningSession":"Open",
    },
    {
      "date":"October 15, 2021",
      "day":"Friday",
      "name":"Dussehra",
      "morningSession":"Closed",
      "eveningSession":"Closed",
    },
    {
      "date":"November 04, 2021",
      "day":"Thursday",
      "name":"Diwali – Laxmi Puja",
      "morningSession":"Closed",
      "eveningSession":"Open",
    },
    {
      "date":"November 05, 2021",
      "day":"Monday",
      "name":"Diwali – Balipratipada",
      "morningSession":"Closed",
      "eveningSession":"Open",
    },
    {
      "date":"November 30, 2021",
      "day":"Monday",
      "name":"Gurunanak Jayanti",
      "morningSession":"Closed",
      "eveningSession":"Open",
    },
  ]

  SundayHolidays = [
    {
      "date":"April 25, 2021",
      "name":"Mahavir Jayanti",
      "status":"Upcoming",
      "day":"Sunday"
    },
    {
      "date":"May 01, 2021",
      "name":"Maharashtra Day",
      "status":"Upcoming",
      "day":"Saturday"
    },
    {
      "date":"August 15, 2021",
      "name":"Independance Day",
      "status":"Upcoming",
      "day":"Sunday"
    },
    {
      "date":"October 02, 2021",
      "name":"Mahatma Gandhi Jayanti",
      "status":"Upcoming",
      "day":"Saturday"
    },
    {
      "date":"December 25, 2021",
      "name":"Christmas",
      "status":"Upcoming",
      "day":"Sunday"
    },
  ]

  constructor( private tradingholidaysservice: TradingHolidaysService) { }

  ngOnInit(): void {
    this.getmcxData()
  }

  getmcxData(){
    const data = {
      "holiday_type":"mcx"
    }
    this.tradingholidaysservice.fetchTradingHoliday(data).subscribe((response) => {
      this.mcxHolidays = response["others"];
      this.SundayHolidays = response["sat/sun"]
    } , (error) =>{
      console.log(error)
    })
  }

}
