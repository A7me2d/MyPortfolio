import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller, private translationService: TranslationService) { }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  t(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
