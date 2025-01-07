import { Component, OnInit, HostListener } from '@angular/core';
import * as Aos from 'aos';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss',
              './homestyle2.scss',
              './homestyle3.scss']
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  isHidden: boolean = false;
  data: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    Aos.init();
    this.loadData(); 
    this.hideVideosBasedOnScreenWidth(); 
    this.typeEffect();
  }

  loadData(): void {
    this.isLoading = true; 
    setTimeout(() => {
      this.isHidden = true; 
      setTimeout(() => {
        this.isLoading = false; 
        this.isHidden = false; 
      }, 1000); 
    }, 4000); 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.hideVideosBasedOnScreenWidth(); 
  }

  hideVideosBasedOnScreenWidth(): void {
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

 words: string[] = ['Lets make magic ' ,'Front-End | Angular ', 'Computer Science','Back-End | .NET'];
  currentText: string = '';
  wordIndex: number = 0;
  charIndex: number = 0;
  typingSpeed: number = 100; 
  erasingSpeed: number = 50; 
  pauseDuration: number = 1000; 
  isErasing: boolean = false;
  typeEffect(): void {
    const currentWord = this.words[this.wordIndex];
    if (!this.isErasing) {
      // الكتابة
      this.currentText = currentWord.substring(0, this.charIndex + 1);
      this.charIndex++;
      if (this.charIndex === currentWord.length) {
        this.isErasing = true;
        setTimeout(() => this.typeEffect(), this.pauseDuration);
        return;
      }
    } else {
      // الحذف
      this.currentText = currentWord.substring(0, this.charIndex - 1);
      this.charIndex--;
      if (this.charIndex === 0) {
        this.isErasing = false;
        this.wordIndex = (this.wordIndex + 1) % this.words.length; 
      }
    }
    setTimeout(() => this.typeEffect(), this.isErasing ? this.erasingSpeed : this.typingSpeed);
  }
}
