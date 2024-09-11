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

  alterateAmountProduct(id: string, amount: number) {
    this.cartProducts.forEach((product) => {
      if (product.productId === id) {
        product.amount = amount
        return
      }
    })
  }

  addProduct(product: ICartProduct) {
    this.cartProducts.push(product)
    this.addedProduct$.next(this.cartProducts.length)

    console.log(this.cartProducts)
  }
}
