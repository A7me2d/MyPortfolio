import { Component } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentDate: string;

  constructor(private translationService: TranslationService) {
    // مصفوفة تحتوي على أسماء الأشهر
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth(); // نأخذ الشهر بدون إضافة 1 لأن المصفوفة تبدأ من الشهر 0
    const year = today.getFullYear();

    // تنسيق التاريخ ليظهر كـ "اليوم/اسم الشهر/السنة"
    this.currentDate = `${day} ${monthNames[month]} ${year}`;
  }

  t(key: string): string {
    return this.translationService.getTranslation(key);
  }

  ngOnInit(): void {}
}
