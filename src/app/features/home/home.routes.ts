import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    loadComponent: () => import('@features/login/login.component').then(m=>m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('@features/signup/signup.component').then(m=>m.SignupComponent)
  }
];
