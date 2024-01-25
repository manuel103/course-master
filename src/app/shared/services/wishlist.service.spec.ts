import { TestBed } from '@angular/core/testing';
import { WishlistService } from './wishlist.service';
import { DatabaseService } from './database.service';

describe('WishlistService', () => {
    let service: WishlistService;
    let dbServiceMock: jasmine.SpyObj<DatabaseService>;

    beforeEach(() => {
        // Create a mock object for DatabaseService
        dbServiceMock = jasmine.createSpyObj('DatabaseService', [
            'addToWishlist',
            'getWishlist',
            'removeFromWishlist'
        ]);

        TestBed.configureTestingModule({
            providers: [
                WishlistService,
                { provide: DatabaseService, useValue: dbServiceMock }
            ]
        });

        service = TestBed.inject(WishlistService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add a course to wishlist', async () => {
        const mockCourse = { id: 1, courseName: 'Test Course' };
        dbServiceMock.addToWishlist.and.returnValue(Promise.resolve(mockCourse) as any);
        await service.addToWishlist(mockCourse);
        expect(dbServiceMock.addToWishlist).toHaveBeenCalledWith(mockCourse);
    });

    it('should check if a course is in wishlist', () => {
        const mockCourse = { id: 1, courseName: 'Test Course' };
        service['wishlist'] = [mockCourse]; // Directly manipulating the private property for testing
        const result = service.isInWishlist(mockCourse.courseName);
        expect(result).toBeTrue();
    });

    it('should get the wishlist', async () => {
        const mockWishlist = [{ id: 1, courseName: 'Test Course' }];
        dbServiceMock.getWishlist.and.returnValue(Promise.resolve(mockWishlist) as any);
        const wishlist = await service.getWishlist();
        expect(wishlist).toEqual(mockWishlist);
    });

    it('should remove a course from the wishlist', async () => {
        const courseId = 1;
        dbServiceMock.removeFromWishlist.and.returnValue(Promise.resolve() as any);
        await service.removeFromWishlist(courseId);
        expect(dbServiceMock.removeFromWishlist).toHaveBeenCalledWith(courseId);
    });
});
