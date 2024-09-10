import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { IAdminPayload } from '../../../../core/interfaces/admin-payload.interface';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.scss'
})
export class AdminsComponent implements OnInit{
  private adminService = inject(AdminService)
  private admins$ = this.adminService.getAdmins$()
  protected admins: IAdminPayload[] | null = null

  constructor() {
    this.adminService.getAllAdmins()

    this.admins$.subscribe({
      next: (res) => {
        console.log(res);
        this.admins = res
      },
      error: (err) => {
        console.error(err);
      }
    })

  }

  ngOnInit(): void {
  }

}
