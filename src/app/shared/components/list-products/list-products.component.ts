import { Component, inject } from '@angular/core';
import { ProductsServiceService } from '../../../services/products-service.service';
import { IProduct } from '../../../core/interfaces/product.interface';
import { CurrencyPipe, NgOptimizedImage, SlicePipe } from '@angular/common';
import { CartService } from '../cart/service/cart.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [NgOptimizedImage, SlicePipe, CurrencyPipe],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {

  productsService = inject(ProductsServiceService)
  cartService = inject(CartService)

  products: IProduct[] = []

  constructor() {
    this.productsService.getProducts().subscribe((productsList) => {
      this.products = productsList
      console.log(productsList)
      console.log(this.products[0])
    })
  }

  ngOnInit(): void {
  }

  addToCart(product: IProduct) {
    this.cartService.addProduct(product)
  }

}
