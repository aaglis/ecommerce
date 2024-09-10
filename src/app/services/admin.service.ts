import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ILogin } from '../core/interfaces/login.interface';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IAdminPayload } from '../core/interfaces/admin-payload.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = `${environment.userUrl}/admin/`;
  private http = inject(HttpClient);
  private router = inject(Router);

  private admins$ = new BehaviorSubject<IAdminPayload[] | null>(null)
  getAdmins$() {
    return this.admins$.asObservable()
  }


  login(login: ILogin) {
    this.http.post<any>(`${this.url}login`, login).subscribe({
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

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/admin/login']);
  }

  getAllAdmins() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<IAdminPayload[]>(`${this.url}admins/all`, { headers }).subscribe({
      next: (res) => {
        this.admins$.next(res);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
