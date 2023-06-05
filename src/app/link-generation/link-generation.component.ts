import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-link-generation',
  templateUrl: './link-generation.component.html',
  styleUrls: ['./link-generation.component.scss'],
  
})
export class LinkGenerationComponent implements OnInit {

  selectExchange = [
    "MCX", "NSE", "NFO"
  ];

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {
      $('.wrapper').addClass('nk-buy');
      $(document).on('click', '.btn-buy', function(){
        $('.wrapper').removeClass('nk-sell');
        $('.wrapper').addClass('nk-buy');
      });
      $(document).on('click', '.btn-sell', function(){
        $('.wrapper').removeClass('nk-buy');
        $('.wrapper').addClass('nk-sell');
      });
      
      
      $(document).on('click', '.lmt', function(){
        $('.qBlk1').addClass('act');
        $('.qBlk2').addClass('act');
        $('.qBlk3').removeClass('act');
        $('.qBlk4').removeClass('act');
        $('.qBlk5').removeClass('act');
        $('.qBlk6').removeClass('act');
      });
      $(document).on('click', '.mkt', function(){
        $('.qBlk1').addClass('act');
        $('.qBlk2').removeClass('act');
        $('.qBlk3').removeClass('act');
        $('.qBlk4').removeClass('act');
        $('.qBlk5').removeClass('act');
        $('.qBlk6').removeClass('act');
      });
      $(document).on('click', '.sl', function(){
        $('.qBlk1').addClass('act');
        $('.qBlk2').addClass('act');
        $('.qBlk3').addClass('act');
        $('.qBlk4').removeClass('act');
        $('.qBlk5').removeClass('act');
        $('.qBlk6').removeClass('act');
      });
      $(document).on('click', '.slm', function(){
        $('.qBlk1').addClass('act');
        $('.qBlk2').removeClass('act');
        $('.qBlk3').addClass('act');
        $('.qBlk4').removeClass('act');
        $('.qBlk5').removeClass('act');
        $('.qBlk6').removeClass('act');
      });
    })
  }

}
