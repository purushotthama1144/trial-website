import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-t-c',
  templateUrl: './t-c.component.html',
  styleUrls: ['./t-c.component.scss'],
  
})
export class CircularTCComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}