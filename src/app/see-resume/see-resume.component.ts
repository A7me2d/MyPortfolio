import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { ViewportScroller } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-see-resume',
  templateUrl: './see-resume.component.html',
  styleUrls: ['./see-resume.component.scss']
})
export class SeeResumeComponent implements OnInit {
  resumeUrl = 'assets/image/Ahmed_Hany_cv.pdf';
  resumeSafeUrl: SafeResourceUrl;

  constructor(
    private viewportScroller: ViewportScroller,
    private sanitizer: DomSanitizer,
    private translationService: TranslationService
  ) {
    this.resumeSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.resumeUrl);
  }

  ngOnInit(): void {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  t(key: string): string {
    return this.translationService.getTranslation(key);
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = this.resumeUrl;
    link.download = 'Ahmed_Hany_cv.pdf';
    link.click();
  }

  openInNewTab(): void {
    window.open(this.resumeUrl, '_blank', 'noopener');
  }
}
