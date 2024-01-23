import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from '@app/shared/services/cart.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent {

  constructor(
    public dialogRef: MatDialogRef<PlaceOrderComponent>,
    private cartService: CartService
  ) { }

  closeDialog() {
    this.cartService.clearCart();
    this.dialogRef.close();
  }
}
