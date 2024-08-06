import { Component, inject, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
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
  styleUrl: './signup.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SignupComponent implements AfterViewInit {
  router = inject(Router)
  formBuilder = inject(FormBuilder)
  register = inject(RegisterService)

  @ViewChild('swiper', { static: false }) swiper?: ElementRef;
  currentSlide = 1;

  ngAfterViewInit() {
    if (this.swiper) {
      const swiper = this.swiper.nativeElement.swiper;

      swiper.on('slideChange', () => {
        this.currentSlide = swiper.realIndex + 1;
      });
    }
  }

  registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    name: [``],
    alias: [``, [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    dateOfBirth: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(11)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    cep: [''],
    streetName: [''],
    city: [''],
    residenceNumber: [''],
  })



  submit() {
    const completeName = `${this.registerForm.value.firstName} ${this.registerForm.value.lastName}`
    this.registerForm.value.name = completeName

    const formValue = this.registerForm.value
    delete formValue.confirmPassword


    if(this.registerForm.valid) {
      this.register.registerUser(formValue).subscribe({
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

  goToNextSlide() {
    if (this.swiper) {
      const swiper = this.swiper.nativeElement.swiper;
      swiper.slideNext();
    }
  }

  goToPreviousSlide() {
    if (this.swiper) {
      const swiper = this.swiper.nativeElement.swiper;
      swiper.slidePrev();
    }
  }

}
