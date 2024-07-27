import { Component, inject } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../shared/components/default-login-layout/default-login-layout.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputLayoutComponent } from '../../shared/components/input-layout/input-layout.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, InputLayoutComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formBuilder = inject(FormBuilder)

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  submit() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value)
    } else {
      console.log('Form is invalid')
    }
  }

}
