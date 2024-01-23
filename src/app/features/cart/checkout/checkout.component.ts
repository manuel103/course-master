import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/shared/services/cart.service';
import { WishlistService } from '@app/shared/services/wishlist.service';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalCost: number = 0;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  moveToWishlist(item: any) {
    this.wishlistService.addToWishlist(item);
    this.cartService.removeFromCart(item.id);
  }

  deleteItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  getActualPrice(item: any): number {
    // Calculate discounted price
    // Ensure the price and discountPercentage are numbers
    let price = parseFloat(item.actualPrice.replace(/[^0-9\.]/g, ''));
    let discount = parseFloat(item.discountPercentage.replace(/[^0-9\.]/g, ''));
    return price - (price * discount / 100);
  }

  getTotalCost(): number {
    return this.cartItems.reduce((total, item) => total + this.getActualPrice(item), 0);
  }

  getSavingsPerItem(item: any): number {
    let actualPrice = parseFloat(item.actualPrice.replace(/[^0-9\.]/g, ''));
    let discountPercentage = parseFloat(item.discountPercentage.replace(/[^0-9\.]/g, '')) / 100;
    let discountedPrice = actualPrice - (actualPrice * discountPercentage);
    return actualPrice - discountedPrice;
  }

  getTotalSavings(): number {
    return this.cartItems.reduce((totalSavings, item) => totalSavings + this.getSavingsPerItem(item), 0);
  }

  placeOrderDialog() {
    this.dialog.open(PlaceOrderComponent, {
      width: '550px',
      disableClose: true
    });
  }
}
