import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WishlistService } from '@app/shared/services/wishlist.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @Input() course: any; // Course data passed to the component
  @Output() onAddToCart = new EventEmitter<any>(); // Event emitter to notify when a course is added to cart
  @Output() onAddToWishlist = new EventEmitter<any>();

  isWishlisted: boolean = false;

  constructor(
    private wishlistService: WishlistService
  ) { }

  ngOnInit() {
    this.wishlistService.getWishlist().then(wishlist => {
      // Check if the course is in the wishlist
      this.isWishlisted = wishlist.some(item => item.id === this.course.id);
    });
  }

  addToCart() {
    this.onAddToCart.emit(this.course);
  }

  toggleWishlist() {
    if (this.isWishlisted) {
      // Remove from wishlist
      this.wishlistService.removeFromWishlist(this.course.id).then(() => {
        this.isWishlisted = false;
      });
    } else {
      // Add to wishlist
      this.wishlistService.addToWishlist(this.course).then(() => {
        this.isWishlisted = true;
      });
    }
  }
}
