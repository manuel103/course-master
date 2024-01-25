import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AddToCartComponent } from './add-to-cart.component';
import { WishlistService } from '@app/shared/services/wishlist.service';
import { of } from 'rxjs';

describe('AddToCartComponent', () => {
    let component: AddToCartComponent;
    let fixture: ComponentFixture<AddToCartComponent>;
    let mockWishlistService: jasmine.SpyObj<WishlistService>;

    beforeEach(waitForAsync(() => {
        mockWishlistService = jasmine.createSpyObj('WishlistService', ['getWishlist', 'addToWishlist', 'removeFromWishlist']);

        TestBed.configureTestingModule({
            declarations: [AddToCartComponent],
            providers: [
                { provide: WishlistService, useValue: mockWishlistService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddToCartComponent);
        component = fixture.componentInstance;

        // Setup mock response for getWishlist
        mockWishlistService.getWishlist.and.returnValue(Promise.resolve([]) as any);

        // Provide a mock course input
        component.course = { id: 1, name: 'Test Course' };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should check if course is wishlisted on init', async () => {
        const wishlist = [{ id: 1, name: 'Test Course' }];
        mockWishlistService.getWishlist.and.returnValue(Promise.resolve(wishlist) as any);
        await fixture.whenStable();
        expect(component.isWishlisted).toBeFalse();
    });

    it('should emit event on addToCart', () => {
        spyOn(component.onAddToCart, 'emit');
        component.addToCart();
        expect(component.onAddToCart.emit).toHaveBeenCalledWith(component.course);
    });

    it('should add course to wishlist if not already wishlisted', async () => {
        component.isWishlisted = false;
        mockWishlistService.addToWishlist.and.returnValue(Promise.resolve() as any);
        await component.toggleWishlist();
        expect(mockWishlistService.addToWishlist).toHaveBeenCalledWith(component.course);
        expect(component.isWishlisted).toBeTrue();
    });

    it('should remove course from wishlist if already wishlisted', async () => {
        component.isWishlisted = true;
        mockWishlistService.removeFromWishlist.and.returnValue(Promise.resolve() as any);
        await component.toggleWishlist();
        expect(mockWishlistService.removeFromWishlist).toHaveBeenCalledWith(component.course.id);
        expect(component.isWishlisted).toBeFalse();
    });
});
