import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fadeInOut, rotate } from './animations';


@Component({
    template: `<div [@fadeInOut] *ngIf="isVisible" class="fadeInOutDiv"></div>
             <div [@rotate] *ngIf="isVisible" class="rotateDiv"></div>`,
    animations: [fadeInOut, rotate]
})
class TestComponent {
    isVisible = true;
}

describe('Animation Tests', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let element: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [BrowserAnimationsModule]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    });

    it('should create test component', () => {
        expect(component).toBeTruthy();
    });

    it('should have fadeInOut animation style applied', () => {
        fixture.detectChanges();
        const fadeInOutDiv = element.querySelector('.fadeInOutDiv');
        expect(fadeInOutDiv).toBeTruthy();
        // Here you can add more assertions to test specific styles or classes applied
    });

    it('should have rotate animation style applied', () => {
        fixture.detectChanges();
        const rotateDiv = element.querySelector('.rotateDiv');
        expect(rotateDiv).toBeTruthy();
        // Similar to above, add more assertions as needed
    });

    // Add more tests for toggling isVisible and observing animation changes
});
