import { Component, OnInit } from '@angular/core';
import { TradingHolidaysService } from 'src/app/service/trading-holidays/trading-holidays.service';
declare var $: any;

@Component({
  selector: 'app-nse-holiday',
  templateUrl: './nse-holiday.component.html',
  styleUrls: ['./nse-holiday.component.scss'],
  
})
export class NseHolidayComponent implements OnInit {

  nseHolidays = []

  SundayHolidays = []

  constructor(private tradingholidaysservice: TradingHolidaysService) { }

  ngOnInit(): void {
    this.getnseData()
  }

  getnseData(){
    const data = {
      "holiday_type":"nse"
    }
    this.tradingholidaysservice.fetchTradingHoliday(data).subscribe((response) => {
      this.nseHolidays = response["others"];
      this.SundayHolidays = response["sat/sun"]
    } , (error) =>{
      console.log(error)
    })
  }

}
