import { Component, inject } from '@angular/core';
import { ProductsServiceService } from '../../../services/products-service.service';
import { IProduct } from '../../../core/interfaces/product.interface';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {

  productsService = inject(ProductsServiceService)

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

}
