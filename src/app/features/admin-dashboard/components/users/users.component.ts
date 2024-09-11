import { Component, inject } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { IUserInfos } from '../../../../core/interfaces/user-infos.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  private adminService = inject(AdminService);
  private users$ = this.adminService.getusers$();

  protected users: IUserInfos[] | null = null;

  constructor() {
    this.adminService.getAllUsers();

    this.users$.subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
