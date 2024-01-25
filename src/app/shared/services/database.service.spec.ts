import { TestBed } from '@angular/core/testing';
import Dexie from 'dexie';

import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
    let service: DatabaseService;
    let mockCourse: any;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [DatabaseService]
        });
        service = TestBed.inject(DatabaseService);
        await service.wishlist.clear();
        await service.cart.clear();

        mockCourse = {
            id: 1,
            courseName: 'Angular Testing',
            author: 'John Doe',
            actualPrice: 100,
            discountPercentage: 50,
            tags: ['angular', 'testing']
        };
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add a course to wishlist', async () => {
        await service.addToWishlist(mockCourse);
        const wishlist = await service.getWishlist();
        expect(wishlist.length).toBe(1);
        expect(wishlist[0]).toEqual(mockCourse);
    });

    it('should remove a course from wishlist', async () => {
        await service.addToWishlist(mockCourse);
        await service.removeFromWishlist(mockCourse.id);
        const wishlist = await service.getWishlist();
        expect(wishlist.length).toBe(0);
    });

    it('should add a course to cart', async () => {
        await service.addToCart(mockCourse);
        const cart = await service.getCart();
        expect(cart.length).toBe(1);
        expect(cart[0]).toEqual(mockCourse);
    });

    it('should check if a course exists in cart', async () => {
        await service.addToCart(mockCourse);
        const exists = await service.courseExistsInCart(mockCourse.id);
        expect(exists).toBeTrue();
    });

    it('should remove a course from cart', async () => {
        await service.addToCart(mockCourse);
        await service.removeFromCart(mockCourse.id);
        const cart = await service.getCart();
        expect(cart.length).toBe(0);
    });

    it('should clear the cart', async () => {
        await service.addToCart(mockCourse);
        await service.clearCart();
        const cart = await service.getCart();
        expect(cart.length).toBe(0);
    });
});