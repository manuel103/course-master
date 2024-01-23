import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@app/shared/services/cart.service';
import { CoursesService } from '@app/shared/services/courses.service';
import { WishlistService } from '@app/shared/services/wishlist.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  course: any;
  videoUrl: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private sanitizer: DomSanitizer
  ) {
    const url = "https://www.youtube.com/embed/VRoTOE3FqT0";
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseId = Number(params.get('id'));
      this.course = this.coursesService.getCourseById(courseId);
    });
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
