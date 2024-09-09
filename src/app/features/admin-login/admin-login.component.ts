import { Component, inject } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../shared/components/default-login-layout/default-login-layout.component';
import { InputLayoutComponent } from '../../shared/components/input-layout/input-layout.component';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ILogin } from '../../core/interfaces/login.interface';


@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, InputLayoutComponent, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  formBuilder = inject(FormBuilder)
  adminService = inject(AdminService)

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  submit() {
    console.log(this.loginForm.value, this.loginForm.valid)
    if(this.loginForm.valid) {
      this.adminService.login(this.loginForm.value as ILogin)
    } else {
      console.log('Form is invalid')
    }
  }
}
