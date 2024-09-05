import { Component, inject, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../shared/components/default-login-layout/default-login-layout.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputLayoutComponent } from '../../shared/components/input-layout/input-layout.component';
import { RegisterService } from '../../services/register.service';
import Swal from 'sweetalert2';
import { IUserRegister } from '../../core/interfaces/user.interface';

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
<<<<<<< HEAD
    console.log(this.registerForm.value)
    if(this.registerForm.valid) {
      const formattedDateOfBirth = this.formatDateToISO(this.registerForm.value.dateOfBirth as string);
      this.registerForm.get('dateOfBirth')?.setValue(formattedDateOfBirth);

      const { confirmPassword, ...user } = this.registerForm.value;

      user.name = `${user.firstName} ${user.lastName}`;


      this.register.registerUser(user as IUserRegister).subscribe({
=======
    const completeName = `${this.registerForm.value.firstName} ${this.registerForm.value.lastName}`
    this.registerForm.value.name = completeName

    const formValue = this.registerForm.value
    delete formValue.confirmPassword


    if(this.registerForm.valid) {
      this.register.registerUser(formValue).subscribe({
>>>>>>> refs/remotes/aaglis/master
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

  formatDateToISO(dateString: string): string {
    // Remove as barras da string
    const cleanDateString = dateString.replace(/\//g, '');

    // Verifica se a string limpa tem exatamente 8 caracteres (DDMMYYYY)
    // if (cleanDateString.length !== 8) {
    //   throw new Error('Data inválida. Use o formato dd/mm/aaaa.');
    // }

    // Extrai o dia, mês e ano da string limpa
    const day = cleanDateString.slice(0, 2);
    const month = cleanDateString.slice(2, 4);
    const year = cleanDateString.slice(4, 8);

    // Cria um objeto Date no formato ISO
    const formattedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

    // Retorna a data formatada em ISO
    return formattedDate.toISOString();
  }

}
