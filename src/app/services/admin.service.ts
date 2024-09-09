import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ILogin } from '../core/interfaces/login.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = `${environment.userUrl}/admin/login`;
  private http = inject(HttpClient);
  private router = inject(Router);

  login(login: ILogin) {
    this.http.post<any>(this.url, login).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access_token);
        this.router.navigate(['/admin/dashboard']);
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
