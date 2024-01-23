import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [WishlistComponent],
    exports: [],
    imports: [
        WishlistRoutingModule,
        CommonModule,
        MatCardModule,
        MatTooltipModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatRippleModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class WishlistModule { }