import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatabaseService } from './database.service';
import { CartService } from './cart.service';

describe('CartService', () => {
    let service: CartService;
    let dbServiceMock: jasmine.SpyObj<DatabaseService>;
    let snackBarMock: jasmine.SpyObj<MatSnackBar>;

    beforeEach(() => {
        const dbSpy = jasmine.createSpyObj('DatabaseService', ['getCart', 'courseExistsInCart', 'addToCart', 'removeFromCart', 'clearCart']);
        const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

        TestBed.configureTestingModule({
            providers: [
                CartService,
                { provide: DatabaseService, useValue: dbSpy },
                { provide: MatSnackBar, useValue: snackBarSpy }
            ]
        });

        service = TestBed.inject(CartService);
        dbServiceMock = TestBed.inject(DatabaseService) as jasmine.SpyObj<DatabaseService>;
        snackBarMock = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should load initial cart count', async () => {
        dbServiceMock.getCart.and.returnValue(Promise.resolve([{ id: 1 }, { id: 2 }]) as any);
        await service.loadInitialCartCount();
        service.cartItemCount$.subscribe(count => {
            expect(count).toBe(2);
        });
    });

    it('should add course to cart if not already exists', async () => {
        const course = { id: 1, courseName: 'Test Course' };
        dbServiceMock.courseExistsInCart.and.returnValue(Promise.resolve(false));
        dbServiceMock.addToCart.and.returnValue(Promise.resolve() as any);
        dbServiceMock.getCart.and.returnValue(Promise.resolve([course]) as any);

        await service.addToCart(course);

        expect(dbServiceMock.addToCart).toHaveBeenCalledWith(course);
        expect(snackBarMock.open).toHaveBeenCalledWith('Course successfully added to the cart', 'Close', { duration: 3000 });
    });

    it('should not add course to cart if already exists', async () => {
        const course = { id: 1, courseName: 'Test Course' };
        dbServiceMock.courseExistsInCart.and.returnValue(Promise.resolve(true));

        await service.addToCart(course);

        expect(dbServiceMock.addToCart).not.toHaveBeenCalled();
        expect(snackBarMock.open).toHaveBeenCalledWith(`Already exists in the cart: ${course.courseName}`, 'Close', { duration: 3000 });
    });

    it('should remove course from cart', async () => {
        dbServiceMock.removeFromCart.and.returnValue(Promise.resolve() as any);
        dbServiceMock.getCart.and.returnValue(Promise.resolve([]) as any);

        await service.removeFromCart(1);

        expect(dbServiceMock.removeFromCart).toHaveBeenCalledWith(1);
    });

    it('should clear the cart', async () => {
        dbServiceMock.clearCart.and.returnValue(Promise.resolve() as any);

        await service.clearCart();

        expect(dbServiceMock.clearCart).toHaveBeenCalled();
        service.cartItemCount$.subscribe(count => {
            expect(count).toBe(0);
        });
    });
});
