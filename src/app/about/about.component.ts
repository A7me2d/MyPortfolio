import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { ViewportScroller } from '@angular/common';
import { TranslationService } from '../services/translation.service';

interface PersonalInfo {
  label: string;
  value: string;
  icon: string;
}

interface Skill {
  name: string;
  percentage: number;
  icon: string;
  category: 'frontend' | 'backend';
}

interface Experience {
  date: string;
  title: string;
  company: string;
  description: string;
}

interface Education {
  date: string;
  degree: string;
  institution: string;
  description: string;
}

interface Achievement {
  title: string;
  description: string;
  icon: string;
  date: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  personalInfo: PersonalInfo[] = [
    { label: 'about.name', value: 'about.nameValue', icon: 'fa-solid fa-user' },
    { label: 'about.birthday', value: 'about.birthdayValue', icon: 'fa-solid fa-cake-candles' },
    { label: 'about.phone', value: 'about.phoneValue', icon: 'fa-solid fa-phone' },
    { label: 'about.city', value: 'about.cityValue', icon: 'fa-solid fa-location-dot' },
    { label: 'about.age', value: 'about.ageValue', icon: 'fa-solid fa-calendar' },
    { label: 'about.degree', value: 'about.degreeValue', icon: 'fa-solid fa-graduation-cap' },
    { label: 'about.email', value: 'about.emailValue', icon: 'fa-solid fa-envelope' },
    { label: 'about.freelance', value: 'about.freelanceValue', icon: 'fa-solid fa-briefcase' }
  ];

  skills: Skill[] = [
    // Frontend
    { name: 'Angular', percentage: 100, icon: 'fa-brands fa-angular', category: 'frontend' },
    { name: 'HTML', percentage: 100, icon: 'fa-brands fa-html5', category: 'frontend' },
    { name: 'CSS', percentage: 90, icon: 'fa-brands fa-css3-alt', category: 'frontend' },
    { name: 'SCSS', percentage: 90, icon: 'fa-brands fa-sass', category: 'frontend' },
    { name: 'Bootstrap', percentage: 100, icon: 'fa-brands fa-bootstrap', category: 'frontend' },
    { name: 'JavaScript', percentage: 95, icon: 'fa-brands fa-js', category: 'frontend' },
    { name: 'jQuery', percentage: 80, icon: 'fa-solid fa-code', category: 'frontend' },
    { name: 'ES6', percentage: 80, icon: 'fa-brands fa-js', category: 'frontend' },
    { name: 'TypeScript', percentage: 90, icon: 'fa-brands fa-js', category: 'frontend' },
    // Backend
    { name: 'SQL', percentage: 90, icon: 'fa-solid fa-database', category: 'backend' },
    { name: 'C#', percentage: 70, icon: 'fa-brands fa-microsoft', category: 'backend' },
    { name: 'OOP', percentage: 85, icon: 'fa-solid fa-cubes', category: 'backend' },
    { name: 'LINQ', percentage: 85, icon: 'fa-solid fa-code', category: 'backend' },
    { name: 'ADO.NET', percentage: 85, icon: 'fa-solid fa-database', category: 'backend' },
    { name: 'MVC', percentage: 85, icon: 'fa-solid fa-layer-group', category: 'backend' },
    { name: 'APIs', percentage: 85, icon: 'fa-solid fa-plug', category: 'backend' },
    { name: 'SignalR', percentage: 85, icon: 'fa-solid fa-signal', category: 'backend' },
    { name: 'Azure DevOps', percentage: 85, icon: 'fa-brands fa-microsoft', category: 'backend' }
  ];

  experiences: Experience[] = [
    {
      date: 'about.experience1.date',
      title: 'about.experience1.title',
      company: 'about.experience1.company',
      description: 'about.experience1.description'
    },
    {
      date: 'about.experience2.date',
      title: 'about.experience2.title',
      company: 'about.experience2.company',
      description: 'about.experience2.description'
    }
  ];

  education: Education[] = [
    {
      date: '2018 - 2022',
      degree: 'Bachelor of Computer Science',
      institution: 'University of Technology',
      description: 'Graduated with honors. Specialized in software development and web technologies.'
    }
  ];

  achievements: Achievement[] = [
    {
      title: 'Best Developer Award',
      description: 'Recognized for outstanding contributions to multiple projects and innovative solutions.',
      icon: 'fa-solid fa-trophy',
      date: '2023'
    },
    {
      title: 'Certified Angular Developer',
      description: 'Obtained professional certification in Angular development.',
      icon: 'fa-solid fa-certificate',
      date: '2022'
    },
    {
      title: 'Open Source Contributor',
      description: 'Contributed to various open-source projects on GitHub.',
      icon: 'fa-brands fa-github',
      date: '2021'
    }
  ];

  filteredSkills: Skill[] = [];
  activeFilter: string = 'all';

  constructor(
    private viewportScroller: ViewportScroller,
    private translationService: TranslationService
  ) {
    this.filteredSkills = [...this.skills];
    this.updateAge();
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

  updateAge(): void {
    const birthdate = new Date('2000-05-11');
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    const calculatedAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate()) ? age - 1 : age;
    this.personalInfo[4].value = calculatedAge.toString();
  }

  t(key: string): string {
    return this.translationService.getTranslation(key);
  }

  filterSkills(category: string): void {
    this.activeFilter = category;
    if (category === 'all') {
      this.filteredSkills = [...this.skills];
    } else {
      this.filteredSkills = this.skills.filter(skill => skill.category === category);
    }
  }

  copyToClipboard(text: string): void {
    const value = this.t(text);
    navigator.clipboard.writeText(value).then(() => {
      this.showCopyFeedback();
    });
  }

  private showCopyFeedback(): void {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = 'Copied to clipboard!';
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = 'assets/image/Ahmed_Hany_cv.pdf';
    link.download = 'Ahmed_Hany_cv.pdf';
    link.click();
  }
}
