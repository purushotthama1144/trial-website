import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  
})
export class AccordionComponent implements OnInit {
  config: boolean = false;

  @Input('accordion') accordion:any [] = [];

  constructor() { }

  ngOnInit(): void {
  }

  toggle(index: number) {
    if (!this.config) {
      this.accordion.filter((menu, i) => i !== index && menu.active).forEach((menu) => (menu.active = !menu.active));
    }
    this.accordion[index].active = !this.accordion[index].active;
  }

}
