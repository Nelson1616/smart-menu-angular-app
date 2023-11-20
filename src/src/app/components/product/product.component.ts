import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Product } from '../../models/product/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product: Product | null = null;

  @Output() makeOrderEventEmitter = new EventEmitter<{
    productId: number;
    quantity: number;
  }>();

  allowOrder: boolean = true;

  quantity: number = 1;

  minusQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  plusQuantity() {
    this.quantity++;
  }

  makeOrder() {
    if (this.allowOrder) {
      this.allowOrder = false;

      this.makeOrderEventEmitter.emit({
        productId: this.product!.id,
        quantity: this.quantity,
      });

      this.quantity = 1;

      setTimeout(() => {
        this.allowOrder = true;
      }, 3000);
    }
  }
}
