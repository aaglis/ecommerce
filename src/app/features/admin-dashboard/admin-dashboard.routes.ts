import { Routes } from '@angular/router';
import { AdminDashboardComponent } from '@features/admin-dashboard/admin-dashboard.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'administrators',
        loadComponent: () => import('@features/admin-dashboard/components/admins/admins.component').then(m=>m.AdminsComponent)
      }
    ]
  }
];
