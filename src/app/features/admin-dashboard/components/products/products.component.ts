import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../../services/products-service.service';
import { IProduct } from '../../../../core/interfaces/product.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InputLayoutComponent } from '../../../../shared/components/input-layout/input-layout.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AdminService } from '../../../../services/admin.service';
import { ICreateProduct } from '../../../../core/interfaces/create-product.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private productsService = inject(ProductsService)
  products: IProduct[] = []

  constructor(public dialog: MatDialog) {
    this.productsService.getProducts().subscribe((productsList) => {
      this.products = productsList
    })
  }

  openModal() {
    const dialogRef = this.dialog.open(AddProductDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}

@Component({
  selector: 'add-product-dialog',
  standalone: true,
  templateUrl: './dialog/add-product.component.html',
  styleUrl: './dialog/add-product.component.scss',
  imports: [InputLayoutComponent, ReactiveFormsModule, LucideAngularModule],
})
export class AddProductDialogComponent {
  private formbuilder = inject(FormBuilder)
  private productsService = inject(ProductsService)
  protected productForm = this.formbuilder.group({
    type: [''],
    name: [''],
    price: [0],
    stock: [0],
    imageUrl: ['']
  })

  constructor(private dialogRef: MatDialogRef<AddProductDialogComponent>) {}

  submit() {
    if(this.productForm.valid) {
      console.log(this.productForm.value)
      const priceControl = this.productForm.get('price');
      const stockControl = this.productForm.get('stock');
      if (priceControl && stockControl) {
        priceControl.setValue(Number(priceControl.value));
        stockControl.setValue(Number(stockControl.value));
      }
      this.productsService.createProduct(this.productForm.value as ICreateProduct).subscribe({
        next: (response) => {
          Swal.fire({
            title: "Produto criado com sucesso!",
            text: "A página será recarregada.",
            icon: "success",
            confirmButtonText: 'Recarregar',
          }).then(() => {
            window.location.reload()
          })
        },
        error: (error) => {
          console.error(error)
        }
      })
    } else {
      console.log('Form is invalid')
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
