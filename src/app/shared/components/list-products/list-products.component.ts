import { Component, inject } from '@angular/core';
import { ProductsServiceService } from '../../../services/products-service.service';
import { IProduct } from '../../../core/interfaces/product.interface';
import { CurrencyPipe, NgOptimizedImage, SlicePipe } from '@angular/common';
import { CartService } from '../cart/service/cart.service';
import { ICartProduct } from '../../../core/interfaces/id-product.interface';

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
  selectedProducts: ICartProduct[] = []

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
    this.selectedProducts = this.cartService.getCartProductsList()
    if(this.selectedProducts.length > 0) {
      this.selectedProducts.forEach((selectedProduct) => {
        if (selectedProduct.productId === product.id) {
          this.cartService.alterateAmountProduct(product.id, selectedProduct.amount + 1)
          return
        } else {
          this.cartService.addProduct({ productId: product.id, amount: 1 })
        }
      })
    }
    else {
      this.cartService.addProduct({ productId: product.id, amount: 1 })
    }
    console.log(this.cartService.getCartProductsList())
  }

}
