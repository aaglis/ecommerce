import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IOrderProducts } from '../core/interfaces/order-products.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = `${environment.userUrl}/order`
  private httpClient = inject(HttpClient)
  private router = inject(Router)

  createOrder(order: IOrderProducts) {
    const token = localStorage.getItem('token')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post(`${this.url}/create`, order, { headers }).subscribe({
      next: (response) => {
        console.log(response)
        Swal.fire({
          title: "Sua compra foi feita com sucesso!",
          text: "Você será redirecionado para a página home.",
          icon: "success",
          confirmButtonText: 'Ok',
        }).then(() => {
          this.router.navigate(['/'])
        })
      },
      error: (error) => {
        console.error(error)
      }
    })
  }
}
