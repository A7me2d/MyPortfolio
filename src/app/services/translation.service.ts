import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {};
  private currentLang = 'en';
  private langSubject = new BehaviorSubject<string>('en');
  lang$ = this.langSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadLanguage('en');
  }

  loadLanguage(lang: string): void {
    this.currentLang = lang;
    this.http.get(`assets/i18n/${lang}.json`).subscribe(
      (data: any) => {
        this.translations = data;
        this.langSubject.next(lang);
      },
      (error) => {
        console.error('Failed to load translations:', error);
      }
    );
  }

  getTranslation(key: string): string {
    const keys = key.split('.');
    let value = this.translations;
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  }

  getCurrentLang(): string {
    return this.currentLang;
  }
}
