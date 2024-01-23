import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { fadeInOut, rotate } from '@app/core/utils/animations';
import { DrawerService } from '@app/core/services/drawer.service';
import { ThemeService } from '@app/core/services/theme.service';
import { landingNavData } from '../sidenav/nav-data';

@Component({
  selector: 'app-landing-page-side-nav',
  templateUrl: './landing-page-side-nav.component.html',
  styleUrls: ['./landing-page-side-nav.component.scss'],
  animations: [fadeInOut, rotate]
})
export class LandingPageSideNavComponent {
  navData = landingNavData;
  collapsed = false;
  screenWidth = 0;
  isScreenSmall: boolean = false;
  isDarkTheme = false;

  constructor(
    private drawerService: DrawerService,
    private themeService: ThemeService
  ) { }

  @ViewChild('sidenav') sidenav!: MatDrawer;

  closeSidenav(): void {
    this.drawerService.changeDrawerState(false);
  }

  isCollapsed(): boolean {
    return this.collapsed;
  }

  ngOnInit(): void {
    this.themeService.getThemeObservable().subscribe(theme => {
      theme === 'dark-theme' ? this.isDarkTheme = true : this.isDarkTheme = false;
    });
  }

  isSmallScreen(): boolean {
    return this.isScreenSmall;
  }
}
