import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { accountsData } from '../../dashboard-data';
import coursesData from '@app/db/data.json';
import { MatPaginator } from '@angular/material/paginator';
import { CartService } from '@app/shared/services/cart.service';
import { WishlistService } from '@app/shared/services/wishlist.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  accountsData = accountsData;
  coursesData = coursesData;
  paginatedData: any;
  pageSize = 4;
  searchTerm: string = '';
  filteredData = [...this.coursesData];
  cart: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.paginateData();
    this.cdr.detectChanges();
  }

  applyFilter() {
    const filterValue = this.searchTerm.toLowerCase();
    this.filteredData = this.coursesData.filter(item =>
      item.courseName.toLowerCase().includes(filterValue) ||
      item.author.toLowerCase().includes(filterValue) ||
      item.tags.some(tag => tag.toLowerCase().includes(filterValue))
    );

    this.updateView();
  }

  paginateData() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    this.paginatedData = this.filteredData.slice(startIndex, startIndex + this.paginator.pageSize);
  }

  onPageChange(event: any) {
    this.paginateData();
  }

  sortData(sortOrder: 'asc' | 'desc') {
    this.filteredData.sort((a, b) => {
      let priceA = this.getDiscountedPrice(a);
      let priceB = this.getDiscountedPrice(b);
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
    this.updateView();
  }

  getDiscountedPrice(item: any) {
    let actualPrice = parseFloat(item.actualPrice.replace(/[^0-9.]/g, ''));
    let discount = parseFloat(item.discountPercentage.replace(/[^0-9.]/g, ''));
    return actualPrice - (actualPrice * discount / 100);
  }

  updateView() {
    // Reset paginator to the first page
    this.paginator.pageIndex = 0;

    // Update paginated data
    this.paginateData();
  }

  handleAddToCart(course: any) {
    this.cartService.addToCart(course);
  }

  handleAddToWishlist(course: any) {
    this.wishlistService.addToWishlist(course).then(() => {
      course.inWishlist = true;
    });
  }
}
