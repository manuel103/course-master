import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WishlistComponent } from './wishlist.component';
import { WishlistService } from '@app/shared/services/wishlist.service';
import { CartService } from '@app/shared/services/cart.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
  let wishlistServiceSpy: jasmine.SpyObj<WishlistService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async(() => {
    wishlistServiceSpy = jasmine.createSpyObj('WishlistService', ['getWishlist', 'removeFromWishlist']);
    cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);

    wishlistServiceSpy.getWishlist.and.returnValue(Promise.resolve([{ id: 1, courseName: 'Angular Course' }]) as any);

    TestBed.configureTestingModule({
      declarations: [WishlistComponent],
      providers: [
        { provide: WishlistService, useValue: wishlistServiceSpy },
        { provide: CartService, useValue: cartServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load wishlist on init', async () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.wishlist.length).toBeGreaterThan(0);
      expect(component.wishlist[0].courseName).toEqual('Angular Course');
    });
  });

  it('should call addToCart when add to cart is clicked', async () => {
    let course = { id: 2, courseName: 'React Course' };
    component.addToCart(course);
    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(course);
  });

  it('should remove item from wishlist when remove is clicked', async () => {
    let courseId = 1;
    wishlistServiceSpy.removeFromWishlist.and.returnValue(Promise.resolve() as any);
    component.removeFromWishlist(courseId);
    fixture.whenStable().then(() => {
      expect(wishlistServiceSpy.removeFromWishlist).toHaveBeenCalledWith(courseId);
      expect(component.wishlist.find(item => item.id === courseId)).toBeUndefined();
    });
  });
});
