import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { CourseDetailsComponent } from './course-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CartService } from '@app/shared/services/cart.service';
import { CoursesService } from '@app/shared/services/courses.service';
import { WishlistService } from '@app/shared/services/wishlist.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@app/shared/shared.module';
import { CartModule } from '@app/features/cart/cart.module';

describe('CourseDetailsComponent', () => {
    const mockCourse = {
        id: 123,
        courseName: 'Test Course'
    };
    let component: CourseDetailsComponent;
    let fixture: ComponentFixture<CourseDetailsComponent>;
    let mockCartService: any, mockCoursesService: any, mockWishlistService: any;
    let mockActivatedRoute;

    beforeEach(async () => {
        mockCartService = jasmine.createSpyObj(['addToCart']);
        mockCoursesService = jasmine.createSpyObj(['getCourseById']);
        mockWishlistService = jasmine.createSpyObj('WishlistService', ['getWishlist', 'addToWishlist']);
        mockWishlistService.getWishlist.and.returnValue(Promise.resolve([{ /* mock data */ }]));
        mockWishlistService.addToWishlist.and.returnValue(Promise.resolve({ /* mock result */ }));


        mockActivatedRoute = {
            paramMap: of(new Map([['id', '123']]))
        };

        // Mock the getCourseById method to return the mock course
        mockCoursesService.getCourseById.and.returnValue(mockCourse);

        await TestBed.configureTestingModule({
            declarations: [CourseDetailsComponent],
            imports: [MatCardModule, SharedModule, CartModule],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: CartService, useValue: mockCartService },
                { provide: CoursesService, useValue: mockCoursesService },
                { provide: WishlistService, useValue: mockWishlistService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CourseDetailsComponent);
        component = fixture.componentInstance;
        const safeUrl = TestBed.inject(DomSanitizer)
            .bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/VRoTOE3FqT0');
        component.videoUrl = safeUrl;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch course details based on route parameters', fakeAsync(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

        const testCourse = { id: 123, courseName: 'Test Course' };
        mockCoursesService.getCourseById.and.returnValue(testCourse);
        fixture.detectChanges();

        tick(10000);

        expect(component.course).toEqual(testCourse);
        expect(mockCoursesService.getCourseById).toHaveBeenCalledWith(123);
        expect(mockWishlistService.getWishlist).toHaveBeenCalled();

        flush();
    }));

    it('should add a course to the cart', () => {
        const testCourse = { id: 123, courseName: 'Test Course' };
        component.handleAddToCart(testCourse);
        expect(mockCartService.addToCart).toHaveBeenCalledWith(testCourse);
    });

    it('should add a course to the wishlist', fakeAsync(() => {
        const testCourse = { id: 123, courseName: 'Test Course', inWishlist: false };
        mockWishlistService.addToWishlist.and.returnValue(Promise.resolve());

        component.handleAddToWishlist(testCourse);
        tick();

        expect(testCourse.inWishlist).toBeTrue();
        expect(mockWishlistService.addToWishlist).toHaveBeenCalledWith(testCourse);
    }));

    it('should correctly calculate time left for sale', () => {
        const testCourse = { id: 123, courseName: 'Test Course', discountPercentage: 20 };
        const timeLeft = component.getTimeLeftForSale(testCourse);

        expect(timeLeft).toBeDefined();
        expect(timeLeft?.hours).toBeLessThan(24);
    });
});
