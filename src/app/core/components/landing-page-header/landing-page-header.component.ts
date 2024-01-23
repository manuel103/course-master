import { Component, Input, OnInit, ViewChild, Renderer2, ElementRef, HostListener, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { fadeInOut } from '@app/core/utils/animations';
import { DrawerService } from '@app/core/services/drawer.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ThemeService } from '@app/core/services/theme.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-landing-page-header',
  templateUrl: './landing-page-header.component.html',
  styleUrls: ['./landing-page-header.component.scss'],
  animations: [fadeInOut]
})
export class LandingPageHeaderComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  isDarkTheme = false;
  showSubMenu: boolean = true;

  @ViewChild('sidenav') sidenav!: MatDrawer;


  isScreenSmall: boolean = false;
  isSidenavOpen: boolean = false;
  showFiller = false;
  isSticky: boolean = false;
  isSideNavCollapsed = false;

  @HostBinding('class') className = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private drawerService: DrawerService,
    private renderer: Renderer2,
    private el: ElementRef,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        this.isScreenSmall = result.matches;
      });

    this.drawerService.currentDrawerState.subscribe(state => {
      this.isSidenavOpen = state;
      if (!this.isSidenavOpen && this.isScreenSmall && this.sidenav) {
        this.sidenav.close();
      }
    });

    this.themeService.getThemeObservable().subscribe(theme => {
      theme === 'dark-theme' ? this.isDarkTheme = true : this.isDarkTheme = false;
    });

    this.themeService.setTheme(this.themeService.getTheme());
  }

  slideToggleChange(event: MatSlideToggleChange) {
    if (event.source.checked) {
      this.themeService.setTheme("dark-theme");
    } else {
      this.themeService.setTheme("light-theme")
    }
    // this.className = event.source.checked ? this.darkClassName : this.lightClassName;
    // this.themeService.toggleTheme(this.overlay, event.source.checked);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = this.el.nativeElement.getBoundingClientRect().top;
    this.isSticky = offset < 0;
    if (this.isSticky) {
      this.renderer.addClass(this.el.nativeElement, 'sticky');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'sticky');
    }
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  getHeaderClass(): string {
    let styleClass = '';

    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'header-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'header-md-screen'
    }

    return styleClass;
  }

  isSmallScreen(): boolean {
    return this.isScreenSmall;
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.drawerService.changeDrawerState(this.isSidenavOpen);
  }
}
