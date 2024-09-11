import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { LucideAngularModule } from 'lucide-angular';
import { IUserInfos } from '../../../core/interfaces/user-infos.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, CartComponent, RouterLink, AsyncPipe, CommonModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy, OnInit {
  private router = inject(Router)
  private loginService = inject(LoginService)

  searchImg: string = 'assets/search-icon.svg'
  userImg: string = 'assets/user-icon.svg'

  user$ = this.loginService.getUser$()
  user: IUserInfos | null = null
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
      const decodeToken: IUserInfos = jwtDecode(token)
      const user = {
        ...decodeToken
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

  redirectToCartPage() {
    const token = localStorage.getItem('token')
    if(token) {
      const decodedToken: any = jwtDecode(token)
      if(decodedToken.cpf) {
        this.router.navigate(['/carrinho'])
      } else {
        Swal.fire({
          title: 'Administradores não podem acessar o carrinho',
          text: 'Para acessar o carrinho, você precisa entrar como usuário.',
          icon: 'warning',
          confirmButtonText: 'Entrar como usuário',
        }).then(() => {
          this.router.navigate(['/login'])
        })
      }
    } else {
      Swal.fire({
        title: 'Você precisa estar logado',
        text: 'Para acessar o carrinho, você precisa estar logado.',
        icon: 'warning',
        confirmButtonText: 'Fazer Login',
      }).then(() => {
        this.router.navigate(['/login'])
      })
    }
  }

}
