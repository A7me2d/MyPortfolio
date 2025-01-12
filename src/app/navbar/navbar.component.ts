import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isCollapsed = false;

  constructor(private router: Router) {
    // الاشتراك في أحداث التوجيه لتحديث حالة القائمة
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // إغلاق القائمة عند تغيير الصفحة
      this.isCollapsed = true;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const screenWidth = window.innerWidth;
    // إغلاق القائمة عندما تكون الشاشة أصغر من 768px
    this.isCollapsed = screenWidth < 768; 
  }
}
