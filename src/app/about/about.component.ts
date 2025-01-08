import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit{

  constructor(private viewportScroller: ViewportScroller) { }
  ngOnInit(): void {
    Aos.init();
        this.viewportScroller.scrollToPosition([0, 0]);
  }
  
  

}
