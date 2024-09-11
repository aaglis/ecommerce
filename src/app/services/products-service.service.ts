import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from '../core/interfaces/product.interface';
import { ICreateProduct } from '../core/interfaces/create-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    private apiUrl = `${environment.userUrl}/product`

    private httpClient = inject(HttpClient)

    getProducts() {
      return this.httpClient.get<IProduct[]>(`${this.apiUrl}/find-all`)
    }

    getProductById(id: string) {
      return this.httpClient.get<IProduct>(`${this.apiUrl}/find-oneId/${id}`)
    }

    createProduct(product: ICreateProduct) {
      const token = localStorage.getItem('token')

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      return this.httpClient.post(`${this.apiUrl}/create`, product, { headers })
    }

    /*
      {
        "userId": 1,
        "products": [
          {
            "productId": "b5aba2aa080d1dd679cfc4fb6b86c15b",
            "amount": 5
          },
          {
            "productId": "c16f931aa94dbaad6f083b120d6a3515",
            "amount": 4
          }
        ]
      }
    */
}
