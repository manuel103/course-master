import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@app/shared/services/cart.service';
import { CoursesService } from '@app/shared/services/courses.service';
import { WishlistService } from '@app/shared/services/wishlist.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
  course: any;
  videoUrl: SafeResourceUrl;
  private intervalId: any;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef
  ) {
    const url = "https://www.youtube.com/embed/VRoTOE3FqT0";
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseId = Number(params.get('id'));
      this.course = this.coursesService.getCourseById(courseId);
    });

    this.updateTimeLeft();

    this.intervalId = setInterval(() => {
      // This triggers change detection every second
      this.updateTimeLeft();
    }, 1000);
  }

  handleAddToCart(course: any) {
    this.cartService.addToCart(course);
  }

  handleAddToWishlist(course: any) {
    this.wishlistService.addToWishlist(course).then(() => {
      course.inWishlist = true;
    });
  }

  getTimeLeftForSale(course: any): { hours: number, minutes: number, seconds: number } | null {
    if (!course.discountPercentage || course.discountPercentage <= 0) {
      return null;
    }

    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeLeft = endOfDay.getTime() - now.getTime();

    // Convert time left into hours, minutes, and seconds
    let secondsLeft = Math.floor(timeLeft / 1000);
    const hours = Math.floor(secondsLeft / 3600);
    secondsLeft %= 3600;
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    if (hours < 24) {
      return { hours, minutes, seconds };
    }

    return null;
  }

  private updateTimeLeft() {
    this.cdRef.detectChanges(); // Trigger change detection
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
