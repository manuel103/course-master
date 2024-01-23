import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: any[] = [];

  constructor(
    private dbService: DatabaseService
  ) { }

  addToWishlist(course: any) {
    return this.dbService.addToWishlist(course);
  }

  isInWishlist(courseName: string): boolean {
    return this.wishlist.some(item => item.courseName === courseName);
  }

  getWishlist() {
    return this.dbService.getWishlist();
  }

  removeFromWishlist(id: number) {
    return this.dbService.removeFromWishlist(id);
  }
}
