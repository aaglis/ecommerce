import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IAdminPayload } from '../../core/interfaces/admin-payload.interface';
import { jwtDecode } from 'jwt-decode';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [LucideAngularModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  protected adminInfos: IAdminPayload | null = null;
  private adminService = inject(AdminService);

  constructor() {
    const token = localStorage.getItem('token');
    if(token) {
      const tokenDecoded: IAdminPayload = jwtDecode(token);
      this.adminInfos = tokenDecoded
    }
  }

  logout() {
    this.adminService.logout();
  }
}
