import { Injectable } from '@angular/core';
import { IProduct } from '../../../../core/interfaces/product.interface';
import { BehaviorSubject } from 'rxjs';
import { ICartProduct } from '../../../../core/interfaces/id-product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProducts: ICartProduct[] = []
  private addedProduct$ = new BehaviorSubject<number>(0)

  get cartLength() {
    console.log('chamou carrinho qtd')
    return this.addedProduct$.asObservable()
  }

  getCartProductsList() {
    return this.cartProducts
  }

  alterateAmountProduct(id: string) {
    let totalProducts: number = 0
    this.cartProducts.forEach((product) => {
      totalProducts += product.amount
      if (product.productId === id) {
        product.amount++
        totalProducts++
        return
      }
    })
    console.log('caiu no item existente no carrinho',totalProducts)
    this.addedProduct$.next(totalProducts)
  }

  clearCart() {
    this.cartProducts = []
    this.addedProduct$.next(0)
  }

  addProduct(product: ICartProduct) {
    let totalProducts = 0
    this.cartProducts.push(product)
    this.cartProducts.forEach((product) => {
      totalProducts += product.amount
    })
    console.log(totalProducts)
    this.addedProduct$.next(totalProducts)

    console.log(this.cartProducts)
  }
}
