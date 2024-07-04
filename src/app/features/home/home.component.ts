import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ListProductsComponent } from '../../shared/components/list-products/list-products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ListProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
