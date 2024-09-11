import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../services/products-service.service';
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

  productsService = inject(ProductsService)
  cartService = inject(CartService)

  products: IProduct[] = []
  selectedProducts: ICartProduct[] = []

  constructor() {
    this.productsService.getProducts().subscribe((productsList) => {
      this.products = productsList
      console.log(productsList)
    })
  }

  ngOnInit(): void {
  }

  addToCart(product: IProduct) {
    this.selectedProducts = this.cartService.getCartProductsList()
    if(this.selectedProducts.length > 0) {

      let hasProduct: boolean = this.selectedProducts.some((item) => {
        if(item.productId === product.id) {
          return true
        }
        return false
      })

      if(hasProduct) {
        console.log('ja temos esse produto no carrinho!')
        this.cartService.alterateAmountProduct(product.id)
      } else {
        console.log('nao temos esse produto no carrinho!')
        this.cartService.addProduct({ productId: product.id, amount: 1 })
      }
    }
    else {
      console.log('caiu no global')
      this.cartService.addProduct({ productId: product.id, amount: 1 })
    }
    console.log(this.cartService.getCartProductsList())
  }

}
