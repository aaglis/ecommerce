import { Component, inject } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../shared/components/default-login-layout/default-login-layout.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputLayoutComponent } from '../../shared/components/input-layout/input-layout.component';
import { RegisterService } from '../../services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, RouterLink, InputLayoutComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  router = inject(Router)
  formBuilder = inject(FormBuilder)
  register = inject(RegisterService)

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  submit() {
    if(this.registerForm.valid) {
      this.register.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            title: "Login feito com sucesso!",
            text: "Você será redirecionado para a página de login.",
            icon: "success",
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Fazer login',
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if(result.isConfirmed) {
              this.router.navigate(['/login'])
            }
          })
          console.log(response)
        },
        error: (error) => {
          console.error(error)
        }
      })
    } else {
      console.log('Form is invalid')
    }
  }

}
