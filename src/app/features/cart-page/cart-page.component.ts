import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../shared/components/cart/service/cart.service';
import { ProductsServiceService } from '../../services/products-service.service';
import { IProduct } from '../../core/interfaces/product.interface';
import { IOrderProducts } from '../../core/interfaces/order-products.interface';
import { jwtDecode } from 'jwt-decode';
import { IUserInfos } from '../../core/interfaces/user-infos.interface';
import { OrderService } from '../../services/order.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit{
  private cartService = inject(CartService)
  private orderService = inject(OrderService)
  private productsService = inject(ProductsServiceService)
  cartProducts = this.cartService.getCartProductsList()
  products: IProduct[] = []

  ngOnInit(): void {
    this.cartProducts.forEach((product) => {
      this.productsService.getProductById(product.productId).subscribe((product) => {
        this.products.push(product)
      })
    })
    console.log(this.products)
  }

  comprar() {

    const token = localStorage.getItem('token')

    let userId: number = 0
    if(token) {
      const decodedToken: IUserInfos = jwtDecode(token)
      if(decodedToken.id) {
        userId = decodedToken.id
      }
    }
    const orderProducts: IOrderProducts = {
      userId: userId,
      products: this.cartProducts
    }
    console.log(orderProducts)
    this.orderService.createOrder(orderProducts)
  }
}
