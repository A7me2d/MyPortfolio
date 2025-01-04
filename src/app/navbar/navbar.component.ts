import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  isCollapsed = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize(); // التحقق عند تحميل الصفحة لأول مرة
  }

  private checkScreenSize() {
    const screenWidth = window.innerWidth;
    this.isCollapsed = screenWidth < 768; // إضافة الكلاس عند عرض الشاشة أقل من 768px
  }
}
