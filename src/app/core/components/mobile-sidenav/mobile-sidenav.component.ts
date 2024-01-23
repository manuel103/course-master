import { Component, ViewChild, OnInit } from '@angular/core';
import { navbarData } from '../sidenav/nav-data';
import { MatDrawer } from '@angular/material/sidenav';
import { fadeInOut, rotate } from '@app/core/utils/animations';
import { DrawerService } from '@app/core/services/drawer.service';
import { ThemeService } from '@app/core/services/theme.service';

@Component({
  selector: 'app-mobile-sidenav',
  templateUrl: './mobile-sidenav.component.html',
  styleUrls: ['./mobile-sidenav.component.scss'],
  animations: [fadeInOut, rotate]
})
export class MobileSidenavComponent implements OnInit {
  navData = navbarData;
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
