import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from './database.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor(
    private dbService: DatabaseService,
    private snackBar: MatSnackBar
  ) {
    this.loadInitialCartCount();
    this.loadCartItems();
  }

  getCart() {
    return this.dbService.getCart();
  }

  private async loadInitialCartCount() {
    const cartItems = await this.dbService.getCart();
    this.cartItemCount.next(cartItems.length);
  }

  async addToCart(course: any) {
    const exists = await this.dbService.courseExistsInCart(course.id);

    if (exists) {
      this.snackBar.open(`Already exists in the cart: ${course.courseName}`, 'Close', {
        duration: 3000
      });
    } else {
      await this.dbService.addToCart(course);
      this.snackBar.open('Course successfully added to the cart', 'Close', {
        duration: 3000
      });
      this.updateCartItemCount();
      this.loadCartItems();
    }
  }

  private async updateCartItemCount() {
    const cartItems = await this.dbService.getCart();
    this.cartItemCount.next(cartItems.length);
  }

  private async loadCartItems() {
    const items = await this.dbService.getCart();
    this.cartItems.next(items);
  }

  async removeFromCart(id: number) {
    await this.dbService.removeFromCart(id);
    this.updateCartItemCount();
    this.loadCartItems();
  }

  async clearCart() {
    await this.dbService.clearCart();
    this.cartItemCount.next(0);
    this.cartItems.next([]);
  }
}
