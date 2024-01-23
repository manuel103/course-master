import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { DrawerService } from '@app/core/services/drawer.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-shared-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.scss']
})
export class AuthenticatedLayoutComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidth = 0;
  isScreenSmall: boolean = false;
  isSidenavOpen: boolean = false;

  @ViewChild('sidenav') sidenav!: MatDrawer;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private drawerService: DrawerService
  ) { }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        this.isScreenSmall = result.matches;
        if (!this.isScreenSmall) {
          this.isSidenavOpen = false; // Close sidenav on larger screens
          this.drawerService.changeDrawerState(false); // Notify other components
          if (this.sidenav) {
            this.sidenav.close();
          }
        }
      });

    this.drawerService.currentDrawerState.subscribe(state => {
      this.isSidenavOpen = state;
      if (!this.isSidenavOpen && this.isScreenSmall && this.sidenav) {
        this.sidenav.close();
      }
    });
  }
}
