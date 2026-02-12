import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';
import * as Aos from 'aos';

interface Technology {
  name: string;
  icon: string;
}

interface Project {
  titleKey: string;
  title: string;
  descriptionKey: string;
  image: string;
  category: string;
  technologies: Technology[];
  github?: string;
  live?: string;
  security?: string;
  gallery?: string[];
  stars?: number;
  forks?: number;
  views?: number;
}

@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.scss']
})
export class MyprojectsComponent implements OnInit {
  projects: Project[] = [
    {
      titleKey: 'projects.project1.title',
      title: 'E-Commerce',
      descriptionKey: 'projects.project1.description',
      image: '/assets/image/11.png',
      category: 'projects.ecommerce',
      technologies: [
        { name: 'Angular', icon: 'fa-brands fa-angular' },
        { name: 'TypeScript', icon: 'fa-brands fa-js' },
        { name: 'Bootstrap', icon: 'fa-brands fa-bootstrap' },
        { name: 'API', icon: 'fa-solid fa-plug' }
      ],
      github: 'https://github.com/A7me2d/MyPop-upSale',
      live: 'https://my-pop-up-sale.vercel.app/',
      gallery: ['/assets/image/11.png']
    },
    {
      titleKey: 'projects.project2.title',
      title: 'Currency Converter',
      descriptionKey: 'projects.project2.description',
      image: '/assets/image/QNB.png',
      category: 'projects.tools',
      technologies: [
        { name: 'HTML', icon: 'fa-brands fa-html5' },
        { name: 'CSS', icon: 'fa-brands fa-css3-alt' },
        { name: 'JavaScript', icon: 'fa-brands fa-js' },
        { name: 'API', icon: 'fa-solid fa-plug' }
      ],
      security: '#',
      gallery: ['/assets/image/QNB.png']
    },
    {
      titleKey: 'projects.project3.title',
      title: 'QR Attendance',
      descriptionKey: 'projects.project3.description',
      image: '/assets/image/QR.png',
      category: 'projects.webapps',
      technologies: [
        { name: 'Angular', icon: 'fa-brands fa-angular' },
        { name: 'TypeScript', icon: 'fa-brands fa-js' },
        { name: 'JWT', icon: 'fa-solid fa-key' },
        { name: 'Database', icon: 'fa-solid fa-database' }
      ],
      security: '#',
      gallery: ['/assets/image/QR.png']
    },
    {
      titleKey: 'projects.project4.title',
      title: 'Yummy',
      descriptionKey: 'projects.project4.description',
      image: '/assets/image/Yummy.png',
      category: 'projects.webapps',
      technologies: [
        { name: 'HTML', icon: 'fa-brands fa-html5' },
        { name: 'CSS', icon: 'fa-brands fa-css3-alt' },
        { name: 'JavaScript', icon: 'fa-brands fa-js' },
        { name: 'AI', icon: 'fa-solid fa-robot' }
      ],
      github: 'https://github.com/A7me2d/Yummy-Best',
      live: 'https://yummy-best.vercel.app/',
      gallery: ['/assets/image/Yummy.png']
    },
    {
      titleKey: 'projects.project5.title',
      title: 'Schedule Manager',
      descriptionKey: 'projects.project5.description',
      image: '/assets/image/Table.png',
      category: 'projects.webapps',
      technologies: [
        { name: 'Angular', icon: 'fa-brands fa-angular' },
        { name: 'TypeScript', icon: 'fa-brands fa-js' },
        { name: 'API', icon: 'fa-solid fa-plug' },
        { name: 'Database', icon: 'fa-solid fa-database' }
      ],
      github: 'https://github.com/A7me2d/TEAM',
      security: '#',
      gallery: ['/assets/image/Table.png']
    },
    {
      titleKey: 'projects.project6.title',
      title: 'Weather',
      descriptionKey: 'projects.project6.description',
      image: '/assets/image/Weather.png',
      category: 'projects.webapps',
      technologies: [
        { name: 'HTML', icon: 'fa-brands fa-html5' },
        { name: 'CSS', icon: 'fa-brands fa-css3-alt' },
        { name: 'JavaScript', icon: 'fa-brands fa-js' },
        { name: 'API', icon: 'fa-solid fa-plug' }
      ],
      github: 'https://github.com/A7me2d/Weather-Website',
      live: 'https://weather-website-roan-theta.vercel.app/',
      gallery: ['/assets/image/Weather.png']
    }
  ];

  filteredProjects: Project[] = [];
  activeFilter: string = 'all';
  isModalOpen: boolean = false;
  selectedProject: Project | null = null;

  private langSub?: Subscription;

  constructor(
    private viewportScroller: ViewportScroller,
    private translationService: TranslationService
  ) {
    this.filteredProjects = [...this.projects];
  }

  ngOnInit(): void {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
    this.viewportScroller.scrollToPosition([0, 0]);

    this.langSub = this.translationService.lang$.subscribe(() => {
      const savedFilter = this.getSavedFilter();
      this.activeFilter = savedFilter;
      this.applyFilter(savedFilter);
      setTimeout(() => {
        Aos.refreshHard();
      });
    });
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  t(key: string): string {
    return this.translationService.getTranslation(key);
  }

  private getSavedFilter(): string {
    return localStorage.getItem('projectFilter') ?? 'all';
  }

  private saveFilterState(filter: string): void {
    localStorage.setItem('projectFilter', filter);
  }

  private applyFilter(category: string): void {
    if (category === 'all') {
      this.filteredProjects = [...this.projects];
      return;
    }
    this.filteredProjects = this.projects.filter(project => project.category === `projects.${category}`);
  }

  filterProjects(category: string): void {
    this.activeFilter = category;
    this.saveFilterState(category);
    this.applyFilter(category);
    setTimeout(() => {
      Aos.refreshHard();
    });
  }

  searchProjects(event: KeyboardEvent): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    if (searchTerm === '') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project => {
        const title = this.t(project.titleKey).toLowerCase();
        const description = this.t(project.descriptionKey).toLowerCase();
        const tech = project.technologies.map(t => t.name.toLowerCase()).join(' ');
        return title.includes(searchTerm) || 
               description.includes(searchTerm) || 
               tech.includes(searchTerm);
      });
    }

    setTimeout(() => {
      Aos.refreshHard();
    });
  }

  openProjectDetails(project: Project): void {
    this.selectedProject = project;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }
}
