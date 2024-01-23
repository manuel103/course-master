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
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [AddToCartComponent, CheckoutComponent, PlaceOrderComponent],
    imports: [
        CartRoutingModule,
        CommonModule,
        MatCardModule,
        MatTooltipModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatRippleModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [AddToCartComponent]
})
export class CartModule { }