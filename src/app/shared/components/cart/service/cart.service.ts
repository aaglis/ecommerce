import { Injectable } from '@angular/core';
import { IProduct } from '../../../../core/interfaces/product.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProducts: IProduct[] = []
  private addedProduct$ = new BehaviorSubject<number>(0)

  get cartLength() {
    console.log('chamou carrinho qtd')
    return this.addedProduct$.asObservable()
  }

  addProduct(product: IProduct) {
    this.cartProducts.push(product)
    this.addedProduct$.next(this.cartProducts.length)

    console.log(this.cartProducts)
  }
}
