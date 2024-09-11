import { Routes } from '@angular/router';
import { AdminDashboardComponent } from '@features/admin-dashboard/admin-dashboard.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'users',
        loadComponent: () => import('@features/admin-dashboard/components/users/users.component').then(m=>m.UsersComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('@features/admin-dashboard/components/products/products.component').then(m=>m.ProductsComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('@features/admin-dashboard/components/orders/orders.component').then(m=>m.OrdersComponent)
      },
      {
        path: 'administrators',
        loadComponent: () => import('@features/admin-dashboard/components/admins/admins.component').then(m=>m.AdminsComponent)
      },
    ]
  }
];
