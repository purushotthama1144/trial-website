import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-calculation-modal',
  templateUrl: './calculation-modal.component.html',
  styleUrls: ['./calculation-modal.component.scss'],
  
})

export class CalculationModalComponent implements OnInit {
  cashAvailable =  "10000";
  lotNrmlMargin: number = 0;
  lotMisMargin: number = 0;
  lotCoMargin: number = 0;
  lotBoMargin: number = 0;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.calculation();
  }

  calculation(){
    this.lotNrmlMargin = Math.floor((+this.cashAvailable/+this.data.element.nrml_margin));
    this.lotMisMargin = Math.floor((+this.cashAvailable/+this.data.element.mis_margin));
    this.lotCoMargin = Math.floor((+this.cashAvailable/+this.data.element.co_margin));
    this.lotBoMargin = Math.floor((+this.cashAvailable/+this.data.element.bo_margin));
  }
}
