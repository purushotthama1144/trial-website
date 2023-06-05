import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-potential-calculator',
  templateUrl: './potential-calculator.component.html',
  
styleUrls: ['./potential-calculator.component.scss']
})
export class PotentialCalculatorComponent implements OnInit {
  
  sliderValue = 5

  monthlyTotalEarning = 1262.5;

//Brokerage Commision
  monthlyBrokerageCommission = 750;
  b = 50/100 * this.sliderValue;
  
  //Mutual fund Incentive
  monthlyMonthlyMutualFundIncentive = 12.5;
  c = 50/100 * this.b;
  
  //Account Opening Incentive
  accountOpeningIncentive = 0
  
  monthlySharingPerAccount = 300
  incentiveAmount = 200
  constructor() { }

  ngOnInit(): void {
  }
  custOnboarded() {
    this.b = (50/100)* this.sliderValue
    this.monthlyBrokerageCommission = this.b * 300
    this.c = 50/100 * this.b;
    this.monthlyMonthlyMutualFundIncentive = 10 * this.c
    
    switch(true){
      case (this.sliderValue >=0 && this.sliderValue <=5):
        this.incentiveAmount = 0;
        break;
      case (this.sliderValue >=6 && this.sliderValue <=24):
        this.incentiveAmount = 200;
        break;
      case (this.sliderValue >=25 && this.sliderValue <=49):
        this.incentiveAmount = 300;
        break;
      case (this.sliderValue >=50):
        this.incentiveAmount = 600;
        break;
    }

    switch(true){
      case (this.sliderValue >=0 && this.sliderValue <=5):
        this.accountOpeningIncentive = this.sliderValue * this.incentiveAmount
        break;
      case (this.sliderValue >=6 && this.sliderValue <=24):
        this.accountOpeningIncentive = this.sliderValue * this.incentiveAmount
        break;
      case (this.sliderValue >=25 && this.sliderValue <=49):
        this.accountOpeningIncentive = 4800 + ((this.sliderValue - 24) * this.incentiveAmount)
        break;
      case (this.sliderValue >=50 && this.sliderValue <=71):
        this.accountOpeningIncentive = 4800 + 7500 + ((this.sliderValue - 49) * this.incentiveAmount)
      break;
      case (this.sliderValue >71):
        this.accountOpeningIncentive = 25500
      break;
    }
    
    this.monthlyTotalEarning = this.monthlyBrokerageCommission + this.monthlyMonthlyMutualFundIncentive + this.accountOpeningIncentive
  }

}
