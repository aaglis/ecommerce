import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, CartComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  searchImg: string = 'assets/search-icon.svg'
  userImg: string = 'assets/user-icon.svg'

  name: string = "Aglis"

}
