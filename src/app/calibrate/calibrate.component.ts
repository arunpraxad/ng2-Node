import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any

@Component({
  selector: 'app-calibrate',
  templateUrl: './calibrate.component.html',
  styleUrls: ['./calibrate.component.css']
})
export class CalibrateComponent implements OnInit {

  calibratedSize;

  constructor(private router: Router) { }

  ngOnInit() {
    this.calibratedSize = localStorage.getItem('calibratedSize')
  }

  ngAfterViewInit() {
    $("#slider").slider({min:1,max:400,value:200,slide:function( event, ui ) {
      var dpi = 115.3;
      var origwidth = 397;
  
      var width = Math.round(ui.value * 0.005 * origwidth);
  
      $('#credit-card').css('width', width+'px');
  
      var sw = (origwidth * screen.width) / (dpi * width);
      var sh = sw * screen.height / screen.width;
      var sd = Math.round (Math.sqrt ((sw*sw) + (sh*sh)) * 100)/100;
  
      $('#calibratedSize').html(sd);
    }});
    this.slideui(200);
  }

  slideui(val) {
    var dpi = 115.3;
    var origwidth = 397;

    var width = Math.round(val * 0.005 * origwidth);

    $('#credit-card').css('width', width+'px');

    var sw = (origwidth * screen.width) / (dpi * width);
    var sh = sw * screen.height / screen.width;
    var sd = Math.round(Math.sqrt((sw*sw) + (sh*sh)) * 100)/100;

    $('#calibratedSize').html(sd);
  }

  save() {
    let size = $('#calibratedSize').text();
    localStorage.setItem('calibratedSize', size)
    this.router.navigate(['home']);
  }
}