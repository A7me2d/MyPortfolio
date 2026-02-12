import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { TranslationService } from '../services/translation.service';

interface NavItem {
  link: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss' ,'./navbar.component2.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  isMobile = false;
  isScrolled = false;
  isSearchActive = false;
  isDarkMode = true;
  currentLang = 'en';

  navItems: NavItem[] = [
    { link: '/home', label: 'navbar.home', icon: 'fa-solid fa-house' },
    { link: '/about', label: 'navbar.about', icon: 'fa-solid fa-user' },
    { link: '/services', label: 'navbar.services', icon: 'fa-solid fa-briefcase' },
    { link: '/projects', label: 'navbar.projects', icon: 'fa-solid fa-code' }
  ];

  constructor(
    private router: Router,
    private translationService: TranslationService
  ) {
    // Subscribe to router events to close mobile menu on navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isCollapsed = true;
    });
  }

  ngOnInit() {
    this.checkScreenSize();
    this.loadSavedPreferences();
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  private checkScreenSize() {
    const screenWidth = window.innerWidth;
    this.isMobile = screenWidth < 768;
    this.isCollapsed = screenWidth < 768;
  }

  private loadSavedPreferences() {
    const savedLang = localStorage.getItem('preferredLang');
    const savedTheme = localStorage.getItem('preferredTheme');

    if (savedLang) {
      this.switchLanguage(savedLang);
    }

    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
      this.applyTheme();
    }
  }

  toggleMobileMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  closeMobileMenu() {
    this.isCollapsed = true;
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    if (this.isSearchActive) {
      setTimeout(() => {
        const searchInput = document.querySelector('.search-container input') as HTMLInputElement;
        searchInput?.focus();
      }, 100);
    }
  }

  filterNavItems(event: KeyboardEvent) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    // Filter nav items based on search term
    this.navItems.forEach(item => {
      const navLink = document.querySelector(`a[routerLink="${item.link}"]`) as HTMLElement;
      if (navLink) {
        const label = this.t(item.label).toLowerCase();
        navLink.style.display = label.includes(searchTerm) ? 'flex' : 'none';
      }
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('preferredTheme', this.isDarkMode ? 'dark' : 'light');
  }

  private applyTheme() {
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }

  switchLanguage(lang: string) {
    this.currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('preferredLang', lang);
    this.translationService.loadLanguage(lang);
  }

  t(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
