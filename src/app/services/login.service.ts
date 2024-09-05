import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IUserLogin } from '../core/interfaces/user-login.interface';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { IUserInfos } from '../core/interfaces/user-infos.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userUrl = `${environment.userUrl}/login`
  private httpClient = inject(HttpClient)
  private router = inject(Router)

  private user$ = new BehaviorSubject<IUserInfos | null>(null)
  getUser$() {
    return this.user$.asObservable()
  }

  login(user: IUserLogin) {
    return this.httpClient.post<any>(this.userUrl, user).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.access_token)
        const decodeToken: IUserInfos = jwtDecode(response.access_token)
        const user = {
          ...decodeToken
        }
        this.user$.next(user)
        console.log(decodeToken)
        this.router.navigate(['/'])
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  logout() {
    localStorage.removeItem('token')
    this.user$.next(null)
    this.router.navigate(['/'])
  }

}
