import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyComponent } from './body.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('BodyComponent', () => {
    let component: BodyComponent;
    let fixture: ComponentFixture<BodyComponent>;
    let breakpointObserverMock: any;

    beforeEach(async () => {
        // Mock BreakpointObserver
        breakpointObserverMock = {
            observe: jasmine.createSpy('observe').and.returnValue(of({
                matches: false // default value
            }))
        };

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [BodyComponent],
            providers: [
                { provide: BreakpointObserver, useValue: breakpointObserverMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return correct class for getBodyClass based on input', () => {
        // Test different scenarios
        component.collapsed = true;
        component.screenWidth = 1024; // greater than 768
        expect(component.getBodyClass()).toEqual('body-trimmed');

        component.collapsed = true;
        component.screenWidth = 600; // less than 768 and greater than 0
        expect(component.getBodyClass()).toEqual('body-md-screen');

        component.collapsed = false;
        expect(component.getBodyClass()).toEqual('');
    });

    it('should update isScreenSmall based on BreakpointObserver', () => {
        // Simulate breakpoint change
        breakpointObserverMock.observe.and.returnValue(of({ matches: true }));
        component.ngOnInit();
        expect(component.isSmallScreen()).toBeTrue();

        breakpointObserverMock.observe.and.returnValue(of({ matches: false }));
        component.ngOnInit();
        expect(component.isSmallScreen()).toBeFalse();
    });
});
