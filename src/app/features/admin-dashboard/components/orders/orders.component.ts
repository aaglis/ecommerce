import { AfterViewInit, Component, ElementRef, inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { IOrderProducts } from '../../../../core/interfaces/order-products.interface';
import { IResponseOrders } from '../../../../core/interfaces/response-orders.interface';
import { DatePipe } from '@angular/common';
import { AdminService } from '../../../../services/admin.service';
import { IUserInfos } from '../../../../core/interfaces/user-infos.interface';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, LucideAngularModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements AfterViewInit {
  private adminService = inject(AdminService)
  private orderService = inject(OrderService)
  protected orders: IResponseOrders[] | null = []
  protected users: IUserInfos[] | null = []

@ViewChildren('tableItem') itemsTable?: QueryList<ElementRef>

  constructor() {
    this.orderService.getAllOrders()
    this.adminService.getAllUsers()

    this.orderService.getOrders$().subscribe({
      next: (orders) => {
        this.orders = orders
      }
    })

    this.adminService.getusers$().subscribe({
      next: (users) => {
        this.users = users
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  ngAfterViewInit() {
    this.itemsTable?.changes.subscribe(() => {
      this.attachClickEvents();
    });
    this.attachClickEvents();
  }

  private attachClickEvents() {
    this.itemsTable?.forEach((item) => {
      item.nativeElement.removeEventListener('click', this.toggleActive); // Remove event listener anterior
      item.nativeElement.addEventListener('click', this.toggleActive); // Adiciona novo listener
    });
  }

  private toggleActive(event: Event) {
    const target = event.currentTarget as HTMLElement;
    target.classList.toggle('active');
  }
}
