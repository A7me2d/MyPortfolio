import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.scss']
})
export class MyprojectsComponent {

  // nextDom!: HTMLElement;
  // prevDom!: HTMLElement;
  // carouselDom!: HTMLElement;
  // SliderDom!: HTMLElement;
  // thumbnailBorderDom!: HTMLElement;
  // thumbnailItemsDom!: NodeListOf<HTMLElement>;
  // timeDom!: HTMLElement;

  // timeRunning: number = 0;
  // timeAutoNext: number = 7000;
  // runTimeOut: any;
  // runNextAuto: any;

  // constructor() { }

  // ngOnInit(): void {
  //   this.nextDom = document.getElementById('next')!;
  //   this.prevDom = document.getElementById('prev')!;
  //   this.carouselDom = document.querySelector('.carousel') as HTMLElement;
  //   this.SliderDom = this.carouselDom.querySelector('.carousel .list') as HTMLElement;
  //   this.thumbnailBorderDom = document.querySelector('.carousel .thumbnail') as HTMLElement;
  //   this.thumbnailItemsDom = this.thumbnailBorderDom.querySelectorAll('.item');
  //   this.timeDom = document.querySelector('.carousel .time') as HTMLElement;

  //   this.thumbnailBorderDom.appendChild(this.thumbnailItemsDom[0]);

  //   this.nextDom.onclick = () => {
  //     this.showSlider('next');
  //   }

  //   this.prevDom.onclick = () => {
  //     this.showSlider('prev');
  //   }

  //   this.runNextAuto = setTimeout(() => {
  //     this.nextDom.click();
  //   },
  //    this.timeAutoNext
  //    )
  //   ;
  // }

  // showSlider(type: string): void {
  //   let SliderItemsDom = this.SliderDom.querySelectorAll('.carousel .list .item');
  //   let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

  //   if (type === 'next') {
  //     this.SliderDom.appendChild(SliderItemsDom[0]);
  //     this.thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
  //     this.carouselDom.classList.add('next');
  //   } else {
  //     this.SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
  //     this.thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
  //     this.carouselDom.classList.add('prev');
  //   }

  //   clearTimeout(this.runTimeOut);
  //   this.runTimeOut = setTimeout(() => {
  //     this.carouselDom.classList.remove('next');
  //     this.carouselDom.classList.remove('prev');
  //   }, this.timeRunning);

  //   clearTimeout(this.runNextAuto);
  //   this.runNextAuto = setTimeout(() => {
  //     this.nextDom.click();
  //   }, this.timeAutoNext);
  // }
}
