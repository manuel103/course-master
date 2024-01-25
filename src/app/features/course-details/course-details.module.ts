import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailsRoutingModule } from './course-details-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CartModule } from '../cart/cart.module';


@NgModule({
    declarations: [CourseDetailsComponent],
    imports: [
        CommonModule,
        CourseDetailsRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatInputModule,
        FormsModule,
        SharedModule,
        CartModule
    ],
    exports: [],
    providers: []
})
export class CourseDetailsModule { }