import { Component, inject } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../shared/components/default-login-layout/default-login-layout.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputLayoutComponent } from '../../shared/components/input-layout/input-layout.component';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { IUserLogin } from '../../core/interfaces/user-login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, InputLayoutComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formBuilder = inject(FormBuilder)
  loginService = inject(LoginService)

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  submit() {
    console.log(this.loginForm.value, this.loginForm.valid)
    if(this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as IUserLogin)
    } else {
      console.log('Form is invalid')
    }
  }

}
