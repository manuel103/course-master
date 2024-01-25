import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ThemeService } from '@app/core/services/theme.service';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SidenavComponent', () => {
    let component: SidenavComponent;
    let fixture: ComponentFixture<SidenavComponent>;
    let breakpointObserverMock: any;
    let themeServiceMock: any;

    beforeEach(async () => {
        // Mock BreakpointObserver
        breakpointObserverMock = {
            observe: jasmine.createSpy('observe').and.returnValue(of({
                matches: false
            }))
        };

        // Mock ThemeService
        themeServiceMock = {
            getThemeObservable: jasmine.createSpy('getThemeObservable').and.returnValue(of('light-theme'))
        };

        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            declarations: [SidenavComponent],
            providers: [
                { provide: BreakpointObserver, useValue: breakpointObserverMock },
                { provide: ThemeService, useValue: themeServiceMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle collapsed state', () => {
        expect(component.isCollapsed()).toBeTrue();
        component.toggleCollapse();
        expect(component.isCollapsed()).toBeFalse();
    });

    it('should close sidenav', () => {
        component.closeSidenav();
        expect(component.isCollapsed()).toBeFalse();
    });

    it('should handle window resize', () => {
        // Mock window resize
        spyOnProperty(window, 'innerWidth').and.returnValue(500);
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        expect(component.isCollapsed()).toBeFalse();
    });

    it('should emit onToggleSideNav event on toggle', () => {
        spyOn(component.onToggleSideNav, 'emit');
        component.toggleCollapse();
        expect(component.onToggleSideNav.emit).toHaveBeenCalledWith({
            collapsed: component.collapsed,
            screenWidth: component.screenWidth
        });
    });
});
