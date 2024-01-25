import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/shared/services/cart.service';
import { WishlistService } from '@app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.wishlistService.getWishlist().then(wishlist => {
      this.wishlist = wishlist;
    });
  }

  addToCart(course: any) {
    this.cartService.addToCart(course);
  }

  removeFromWishlist(id: number) {
    this.wishlistService.removeFromWishlist(id).then(() => {
      this.wishlist = this.wishlist.filter(item => item.id !== id);
    });
  }
}
