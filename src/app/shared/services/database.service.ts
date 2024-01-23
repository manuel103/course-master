import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {
  wishlist: Dexie.Table<any, number>;
  cart: Dexie.Table<any, number>;

  constructor() {
    super('CourseMasterDB');

    this.version(1).stores({
      wishlist: '++id, courseName, author, actualPrice, discountPercentage, tags',
      cart: '++id, courseName, author, actualPrice, discountPercentage, tags'
    });

    this.wishlist = this.table('wishlist');
    this.cart = this.table('cart');
  }

  addToWishlist(course: any) {
    return this.wishlist.add(course);
  }

  getWishlist() {
    return this.wishlist.toArray();
  }

  removeFromWishlist(id: number) {
    return this.wishlist.delete(id);
  }

  addToCart(course: any) {
    return this.cart.add(course);
  }

  async courseExistsInCart(courseId: number): Promise<boolean> {
    const count = await this.table('cart').where({ id: courseId }).count();
    return count > 0;
  }

  getCart() {
    return this.cart.toArray();
  }

  removeFromCart(id: number) {
    return this.cart.delete(id);
  }

  clearCart() {
    return this.cart.clear();
  }
}
