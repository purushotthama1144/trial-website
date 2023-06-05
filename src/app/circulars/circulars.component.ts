import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-circulars',
  templateUrl: './circulars.component.html',
  styleUrls: ['./circulars.component.scss'],
  
})
export class CircularsComponent implements OnInit {
  pageloader : boolean = true
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.pageloader = false
    }, 300);
  }

}
