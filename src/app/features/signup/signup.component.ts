import { Component, inject, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../shared/components/default-login-layout/default-login-layout.component';
import { AbstractControl, FormBuilder, FormControl, FormControlName, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputLayoutComponent } from '../../shared/components/input-layout/input-layout.component';
import { RegisterService } from '../../services/register.service';
import Swal from 'sweetalert2';
import { IUserRegister } from '../../core/interfaces/user.interface';
import { passwordValidator } from '../../core/validators/password.validator';
import { brazilianPhoneValidator } from '../../core/validators/phone.validator';
import { dateOfBirthValidator } from '../../core/validators/date-of-birth.validator';
import { cepValidator } from '../../core/validators/cep.validator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, RouterLink, InputLayoutComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SignupComponent implements AfterViewInit {
  private http = inject(HttpClient)
  private router = inject(Router)
  formBuilder = inject(FormBuilder)
  private register = inject(RegisterService)

  fixFields: boolean = false;

  @ViewChild('swiper', { static: false }) swiper?: ElementRef;
  currentSlide = 1;

  ngAfterViewInit() {
    this.fixFields = false;
    if (this.swiper) {
      const swiper = this.swiper.nativeElement.swiper;

      swiper.on('slideChange', () => {
        this.currentSlide = swiper.realIndex + 1;
      });
    }
  }

  passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  };
//(85) 99999-9999
  registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    name: [``],
    alias: [``, [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required, Validators.maxLength(14)]], // conta com os pontos e traço
    dateOfBirth: ['', [Validators.required, dateOfBirthValidator()]],
    phone: ['', [Validators.required, Validators.maxLength(16), brazilianPhoneValidator()]], // contando com os parênteses e traço
    password: ['', [Validators.required, Validators.minLength(8), passwordValidator()]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    cep: ['', [Validators.maxLength(9)], [cepValidator(this.http)]], // conta com o traço
    streetName: [''],
    city: [''],
    neighborhood: [''],
    state: [''],
    residenceNumber: [''],
  }, {validators: this.passwordMatchValidator});

  getFormControl(name: string): FormControl {
    const control = this.registerForm.get(name) as FormControl;
    if(control === null) {
      throw new Error(`Form control "${name}" not found.`);
    }
    return control;
  }




  submit() {
    console.log(this.registerForm.value)
    if(this.registerForm.valid) {
      const formattedDateOfBirth = this.formatDateToISO(this.registerForm.value.dateOfBirth as string);
      this.registerForm.get('dateOfBirth')?.setValue(formattedDateOfBirth);

      const { confirmPassword, ...user } = this.registerForm.value;

      user.name = `${user.firstName} ${user.lastName}`;


      this.register.registerUser(user as IUserRegister).subscribe({
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

  goToNextSlide(currentSlide: number) {
    this.fixFields = false;
    switch (currentSlide) {
      case 1:
        if (this.registerForm.get('email')?.valid && this.registerForm.get('cpf')?.valid && this.registerForm.get('password')?.valid && this.registerForm.get('confirmPassword')?.valid) {
          this.slideNext();
        } else {
          this.fixFields = true;
        }
        break;
      case 2:
        if (this.registerForm.get('firstName')?.valid && this.registerForm.get('lastName')?.valid && this.registerForm.get('alias')?.valid && this.registerForm.get('phone')?.valid && this.registerForm.get('dateOfBirth')?.valid) {
          this.slideNext();
        } else {
          this.fixFields = true;
        }
        break;
      case 3:
        if (this.registerForm.get('dateOfBirth')?.valid && this.registerForm.get('phone')?.valid) {
          this.slideNext();
        }
        break;
      case 4:
        this.slideNext()
    }


  }

  slideNext() {
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
