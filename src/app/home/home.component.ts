import { Component, OnInit, HostListener } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Aos.init();
    this.hideVideosBasedOnScreenWidth(); // يتم التحقق من عرض الشاشة عندما يتم تحميل المكون
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.hideVideosBasedOnScreenWidth(); // يتم التحقق من عرض الشاشة عند تغيير حجم النافذة
  }

  hideVideosBasedOnScreenWidth() {
    const width = window.innerWidth;
    const video2 = document.getElementById('one');
    const video1 = document.getElementById('two');

  
      if (width <= 1120) {
        
        video1?.classList.remove('d-none');
        video2?.classList.add('d-none');
      } else {
        video1?.classList.add('d-none');
        video2?.classList.remove('d-none');
      }
    
  }
}