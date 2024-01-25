import { Component, Input, OnInit, ViewChild, Renderer2, ElementRef, HostListener, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { fadeInOut } from '@app/core/utils/animations';
import { DrawerService } from '@app/core/services/drawer.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ThemeService } from '@app/core/services/theme.service';
import { CartService } from '@app/shared/services/cart.service';
import { AuthService } from '@app/core/services/auth.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadeInOut]
})
export class HeaderComponent implements OnInit {

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
  cartItemCount = 0;
  cartItems: any[] = [];

  @HostBinding('class') className = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private drawerService: DrawerService,
    private renderer: Renderer2,
    public el: ElementRef,
    private themeService: ThemeService,
    private cartService: CartService,
    private authService: AuthService
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

    // Cart items
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  slideToggleChange(event: MatSlideToggleChange) {
    if (event.source.checked) {
      this.themeService.setTheme("dark-theme");
    } else {
      this.themeService.setTheme("light-theme")
    }
  }

  changeTheme(theme: string) {
    if (theme === 'dark') {
      this.themeService.setTheme("dark-theme");
    } else {
      this.themeService.setTheme("light-theme")
    }
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

  // Cart items
  getActualPrice(item: any): number {
    // Calculate discounted price
    // Ensure the price and discountPercentage are numbers
    let price = parseFloat(item.actualPrice.replace(/[^0-9\.]/g, ''));
    let discount = parseFloat(item.discountPercentage.replace(/[^0-9\.]/g, ''));
    return price - (price * discount / 100);
  }

  getTotalCost(): number {
    return this.cartItems.reduce((total, item) => total + this.getActualPrice(item), 0);
  }

  logout() {
    this.authService.logout();
  }
}
