import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../../services/admin.service';
import { IAdminPayload } from '../../../../core/interfaces/admin-payload.interface';
import { InputLayoutComponent } from '../../../../shared/components/input-layout/input-layout.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

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

  constructor(public dialog: MatDialog) {
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

  openModal() {
    const dialogRef = this.dialog.open(AddAdminDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      // if (result) {
      //   this.adminService.addAdmin(result)
      // }
    });
  }
}

@Component({
  selector: 'add-admin-dialog',
  standalone: true,
  templateUrl: './dialog/add-admin-dialog.component.html',
  styleUrl: './dialog/add-admin-dialog.component.scss',
  imports: [InputLayoutComponent, ReactiveFormsModule, LucideAngularModule],
})
export class AddAdminDialogComponent {
  private formbuilder = inject(FormBuilder)
  private adminService = inject(AdminService)
  protected adminForm = this.formbuilder.group({
    name: [''],
    email: [''],
    password: [''],
    role: ['']
  })

  constructor(private dialogRef: MatDialogRef<AddAdminDialogComponent>) {}

  submit() {
    if(this.adminForm.valid) {
      console.log(this.adminForm.value)
      this.adminService.addAdmin(this.adminForm.value as IAdminPayload)
    } else {
      console.log('Form is invalid')
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
