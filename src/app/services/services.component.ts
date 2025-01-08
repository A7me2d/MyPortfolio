import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }
ngOnInit(): void {
      this.viewportScroller.scrollToPosition([0, 0]);
     
  throw new Error('Method not implemented.');
}

}
