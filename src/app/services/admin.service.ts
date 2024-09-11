import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ILogin } from '../core/interfaces/login.interface';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IAdminPayload } from '../core/interfaces/admin-payload.interface';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { IUserInfos } from '../core/interfaces/user-infos.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private urlAdmin = `${environment.userUrl}/admin/`;
  private urlUser = `${environment.userUrl}/user/`;
  private http = inject(HttpClient);
  private router = inject(Router);

  private admins$ = new BehaviorSubject<IAdminPayload[] | null>(null)
  getAdmins$() {
    return this.admins$.asObservable()
  }

  private users$ = new BehaviorSubject<IUserInfos[] | null>(null)
  getusers$() {
    return this.users$.asObservable()
  }

  addAdmin(admin: IAdminPayload) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.http.post<IAdminPayload>(`${this.urlAdmin}`, admin, { headers }).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          title: "Novo admin criado!",
          text: "A página será recarregada.",
          icon: "success",
          confirmButtonText: 'Recarregar',
        }).then(() => {
          window.location.reload();
        })
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  login(login: ILogin) {
    this.http.post<any>(`${this.urlAdmin}login`, login).subscribe({
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
    this.http.get<IAdminPayload[]>(`${this.urlAdmin}admins/all`, { headers }).subscribe({
      next: (res) => {
        this.admins$.next(res);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getAllUsers() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<IUserInfos[]>(`${this.urlUser}users/all`, { headers }).subscribe({
      next: (res) => {
        console.log(res);
        this.users$.next(res);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
