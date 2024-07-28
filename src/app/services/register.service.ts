import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../core/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private userUrl = `${environment.userUrl}`
  private httpClient = inject(HttpClient)

  testConnection() {
    return this.httpClient.get<any>(this.userUrl)
  }

  registerUser(user: IUser) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.httpClient.post<any>(`${this.userUrl}/user`, user, options)
  }
}
