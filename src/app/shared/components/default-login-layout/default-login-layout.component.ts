import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InputLayoutComponent } from '../input-layout/input-layout.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [RouterLink, InputLayoutComponent, ReactiveFormsModule],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {
  logoUrl = ''



}
