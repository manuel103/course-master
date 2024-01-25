import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { CartService } from '@app/shared/services/cart.service';
import { WishlistService } from '@app/shared/services/wishlist.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@app/shared/shared.module';
import { CartModule } from '@app/features/cart/cart.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let cartService: CartService;
    let wishlistService: any;

    beforeEach(async () => {
        // Mock the services
        const cartServiceMock = {
            addToCart: jasmine.createSpy('addToCart')
        };
        const wishlistServiceMock = {
            addToWishlist: jasmine.createSpy('addToWishlist').and.returnValue(Promise.resolve()),
            getWishlist: jasmine.createSpy('getWishlist').and.returnValue(Promise.resolve([]))
        };

        await TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            imports: [
                MatPaginatorModule, NoopAnimationsModule,
                MatCardModule, MatFormFieldModule,
                FormsModule, ReactiveFormsModule, MatInputModule,
                SharedModule, CartModule, MatButtonModule, RouterTestingModule
            ],
            providers: [
                { provide: CartService, useValue: cartServiceMock },
                { provide: WishlistService, useValue: wishlistServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        cartService = TestBed.inject(CartService);
        wishlistService = TestBed.inject(WishlistService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should paginate data correctly', () => {
        component.applyFilter(); // Apply filter to initialize filteredData
        component.paginateData();
        expect(component.paginatedData.length).toBeLessThanOrEqual(component.pageSize);
    });

    it('should filter data based on search term', () => {
        const searchTerm = 'test';
        component.searchTerm = searchTerm;
        component.applyFilter();
        expect(component.filteredData.every(item => item.courseName.toLowerCase().includes(searchTerm) || item.author.toLowerCase().includes(searchTerm))).toBeTruthy();
    });

    it('should add a course to the cart', () => {
        const course = { id: 1, name: 'Course 1' };
        component.handleAddToCart(course);
        expect(cartService.addToCart).toHaveBeenCalledWith(course);
    });

    // it('should add a course to the wishlist', fakeAsync(() => {
    //     const course = { id: 1, name: 'Course 1', inWishlist: false };

    //     spyOn(wishlistService, 'addToWishlist').and.returnValue(Promise.resolve() as any);
    //     component.handleAddToWishlist(course);

    //     tick(); // Simulate the passage of time until all async operations are complete
    //     fixture.detectChanges(); // Trigger change detection manually
    //     expect(wishlistService.addToWishlist).toHaveBeenCalledWith(course);
    //     expect(course.inWishlist).toBeTruthy();
    // }));

    it('should add a course to the wishlist', fakeAsync(() => {
        const testCourse = { id: 123, courseName: 'Test Course', inWishlist: false };
        wishlistService.addToWishlist.and.returnValue(Promise.resolve());

        component.handleAddToWishlist(testCourse);
        tick();

        expect(testCourse.inWishlist).toBeTrue();
        expect(wishlistService.addToWishlist).toHaveBeenCalledWith(testCourse);
    }));
});
