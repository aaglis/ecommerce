import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IAdminPayload } from '../../core/interfaces/admin-payload.interface';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [LucideAngularModule, RouterOutlet, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  protected adminInfos: IAdminPayload | null = null;

  constructor() {
    const token = localStorage.getItem('token');
    if(token) {
      const tokenDecoded: IAdminPayload = jwtDecode(token);
      this.adminInfos = tokenDecoded
    }
  }
}
