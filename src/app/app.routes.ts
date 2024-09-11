import { Routes } from '@angular/router';
import { adminRoutes } from '@features/admin-dashboard/admin-dashboard.routes';
import { homeRoutes } from '@features/home/home.routes';

export const routes: Routes = [
  {
    path: '',
    children: homeRoutes
  },
  {
    path: 'admin/login',
    loadComponent: () => import('@features/admin-login/admin-login.component').then(m=>m.AdminLoginComponent)
  },
  {
    path: 'admin/dashboard',
    children: adminRoutes
  },
  {
    path: 'carrinho',
    loadComponent: () => import('@features/cart-page/cart-page.component').then(m=>m.CartPageComponent)
  }
];
