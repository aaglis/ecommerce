import { Component, OnDestroy, inject } from '@angular/core';
import { CartService } from './service/cart.service';
import { Subscription } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [AsyncPipe, NgOptimizedImage, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService = inject(CartService)
  cartLength$ = this.cartService.cartLength

  cartImg = '../../../../assets/cart-icon.svg'
}
