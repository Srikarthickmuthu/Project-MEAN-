import { Component, OnChanges } from '@angular/core';
import { AddProduct, errorMessage } from 'src/app/Services/Guard/product';
import { AdminService } from 'src/app/Services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnChanges {
  public product!: AddProduct[];
  public access = false;
  public update!: AddProduct[];
  constructor(
    public adminservice: AdminService,
    public userservice:UserService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.getProducts();
  }

  getProducts() {
    this.adminservice.getProduct().subscribe(
      (res: AddProduct[]) => {
        this.product = res;
      },
      (err: errorMessage) => {
        this.toastr.error(`${err.status} Error ${err.message}`);
      }
    );
  }
  ngOnChanges() {
    this.getProducts();
  }
  id!: number;
  show = false;

  editProduct(data: number) {
    this.dialog
      .open(EditProductComponent)
      .afterClosed().subscribe(
        () => {
          this.getProducts();
          localStorage.removeItem("id")
        },
        (err: errorMessage) => {
          this.toastr.error(`${err.status} Error ${err.message}`);
        }
      );
    localStorage.setItem('id', data.toString());
    this.id = data;
  }

  deleteProduct(data: number) {
    this.userservice.deleteProduct(data).subscribe(
      () => {
        this.getProducts();
        this.toastr.warning('Product deleted..!');
      },
      (err: errorMessage) => {
        this.toastr.error(`${err.status} Error ${err.message}`);
      }
    );
  }
}