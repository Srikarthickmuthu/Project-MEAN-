import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddProduct, errorMessage } from 'src/app/Services/Guard/product';
import { AdminService } from 'src/app/Services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  public product!: AddProduct;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private userService:UserService,
  ) {}

ngOnInit() {
  const id = localStorage.getItem('id');

  this.adminService.getProductEdit(id).subscribe(
    (res: any) => {
      this.product = res;
    },
    (err:errorMessage) => {
      this.toastr.error(`${err.status} Error ${err.message}`);
    }
  );
}

  onSubmit(editProduct: NgForm) {
    const data = editProduct.value.id;
    this.product = editProduct.value;
    this.userService.editProduct(data, this.product).subscribe(
      () => {
        this.toastr.success('Product details edited successfully..!');
        this.dialog.closeAll();
      },
      (err: errorMessage) => {
        this.toastr.error(`${err.status} Error ${err.message}`);
      }
    );
  
    editProduct.resetForm();
  }
}
