import { Component, inject } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../shared/components/default-login-layout/default-login-layout.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputLayoutComponent } from '../../shared/components/input-layout/input-layout.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, RouterLink, InputLayoutComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  formBuilder = inject(FormBuilder)

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  submit() {
    if(this.registerForm.valid) {
      console.log(this.registerForm.value)
    } else {
      console.log('Form is invalid')
    }
  }

}
