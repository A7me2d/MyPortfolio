import { Analytics } from '@vercel/analytics/next';
import { Component, OnInit, HostListener } from '@angular/core';
import * as Aos from 'aos';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './homestyle2.scss', './homestyle3.scss']
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  isHidden: boolean = false;
  data: any[] = [];
  words: string[] = ['Lets make magic ', 'Front-End | Angular ', 'Computer Science', 'Back-End | .NET'];
  currentText: string = '';
  wordIndex: number = 0;
  charIndex: number = 0;
  typingSpeed: number = 100;
  erasingSpeed: number = 50;
  pauseDuration: number = 1000;
  isErasing: boolean = false;

  constructor(private http: HttpClient, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    Aos.init();
    this.loadData();
    this.viewportScroller.scrollToPosition([0, 0]);
    this.hideVideosBasedOnScreenWidth();
    this.typeEffect();
    this.initParallaxEffect();
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

  typeEffect(): void {
    const currentWord = this.words[this.wordIndex];
    if (!this.isErasing) {
      this.currentText = currentWord.substring(0, this.charIndex + 1);
      this.charIndex++;
      if (this.charIndex === currentWord.length) {
        this.isErasing = true;
        setTimeout(() => this.typeEffect(), this.pauseDuration);
        return;
      }
    } else {
      this.currentText = currentWord.substring(0, this.charIndex - 1);
      this.charIndex--;
      if (this.charIndex === 0) {
        this.isErasing = false;
        this.wordIndex = (this.wordIndex + 1) % this.words.length;
      }
    }
    setTimeout(() => this.typeEffect(), this.isErasing ? this.erasingSpeed : this.typingSpeed);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY;
    const parallaxElement = document.querySelector('.parallax-background') as HTMLElement;
    if (parallaxElement) {
      parallaxElement.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
  }

  initParallaxEffect(): void {
    const parallaxElement = document.querySelector('.parallax-background') as HTMLElement;
    if (parallaxElement) {
      parallaxElement.style.transition = 'transform 0.1s ease-out';
    }
  }

ngAfterViewInit(): void {
  this.initTiltEffect();
}

initTiltEffect(): void {
  const card = document.querySelector('.card') as HTMLElement;

  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / rect.height) * 70; // الحد الأقصى 15 درجة مع التأثير العكسي عند التحريك لأعلى أو لأسفل

    const rotateY = (x / rect.width) * 70; // الحد الأقصى 15 درجة

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `rotateX(0) rotateY(0)`;
  });
}


}
