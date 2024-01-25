import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileSidenavComponent } from './mobile-sidenav.component';
import { DrawerService } from '@app/core/services/drawer.service';
import { ThemeService } from '@app/core/services/theme.service';
import { MatDrawer } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('MobileSidenavComponent', () => {
    let component: MobileSidenavComponent;
    let fixture: ComponentFixture<MobileSidenavComponent>;
    let drawerServiceMock: any;
    let themeServiceMock: any;

    beforeEach(async () => {
        drawerServiceMock = jasmine.createSpyObj('DrawerService', ['changeDrawerState']);
        themeServiceMock = jasmine.createSpyObj('ThemeService', ['getThemeObservable']);

        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, RouterTestingModule],
            declarations: [MobileSidenavComponent],
            providers: [
                { provide: DrawerService, useValue: drawerServiceMock },
                { provide: ThemeService, useValue: themeServiceMock }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MobileSidenavComponent);
        component = fixture.componentInstance;
        themeServiceMock.getThemeObservable.and.returnValue(of('dark-theme'));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have correct initial values', () => {
        expect(component.navData).toBeTruthy();
        expect(component.collapsed).toBeFalse();
        expect(component.isScreenSmall).toBeFalse();
        expect(component.isDarkTheme).toBeTrue();
    });

    it('should close sidenav', () => {
        component.closeSidenav();
        expect(drawerServiceMock.changeDrawerState).toHaveBeenCalledWith(false);
    });

    it('should return correct collapsed state', () => {
        component.collapsed = true;
        expect(component.isCollapsed()).toBeTrue();
    });

    it('should return correct small screen state', () => {
        component.isScreenSmall = true;
        expect(component.isSmallScreen()).toBeTrue();
    });

    it('should subscribe to theme changes', () => {
        // Test for initial dark theme
        expect(component.isDarkTheme).toBeTrue();

        // Changing theme to light and triggering change detection
        themeServiceMock.getThemeObservable.and.returnValue(of('light-theme'));
        fixture.detectChanges();

        expect(component.isDarkTheme).toBeTrue();
    });
});
