import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../core/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

    private apiUrl = environment.apiUrl

    private httpClient = inject(HttpClient)

    getProducts() {
      return this.httpClient.get<IProduct[]>(this.apiUrl)
    }
}
