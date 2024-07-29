import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { IUser } from '../../../core/interfaces/user.interface';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { LucideAngularModule } from 'lucide-angular';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, CartComponent, RouterLink, AsyncPipe, CommonModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy, OnInit {
  loginService = inject(LoginService)

  searchImg: string = 'assets/search-icon.svg'
  userImg: string = 'assets/user-icon.svg'

  user$ = this.loginService.getUser$()
  user: IUser | null = null
  subscription: Subscription | null = null
  constructor() {
    this.subscription = this.user$.subscribe( {
      next: (user) => {
        this.user = user
        console.log(this.user?.name)
      }
    })
  }

  ngOnInit() {
    const token = localStorage.getItem('token')
    if (token) {
      const decodeToken: IUser = jwtDecode(token)
      const user = {
        email: decodeToken.email,
        name: decodeToken.name
      }
      this.user = user
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getFirstName(fullName?: string | null): string | null | undefined{
    return fullName?.split(' ')[0];
  }

  logout() {
    this.loginService.logout()
  }

}
