import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/admin.service';
import { AddProduct, errorMessage } from 'src/app/Services/Guard/product';
import { UserService } from 'src/app/Services/user.service';
import { TallyComponent } from '../tally/tally.component';

@Component({
  selector: 'app-selling-details',
  templateUrl: './selling-details.component.html',
  styleUrls: ['./selling-details.component.css'],
})
export class SellingDetailsComponent {
  cart!: any;
  cart1!: any;
  update!: AddProduct;
  Quantity: any;
  value = 'Delivered';

  constructor(
    public userservice: UserService,
    public adminservice: AdminService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.adminservice.getProduct().subscribe((res: any) => {
      this.cart = res;
    });
    this.clear();
  }

  total(data: any, id: any) {
    this.userservice.getCart().subscribe((res: any) => {
      this.cart1 = res.filter(
        (el: { deliveryStatus: string; productName: string }) => {
          return el.deliveryStatus == this.value && el.productName == data;
        },
        (err: errorMessage) => {
          this.toastr.error(`${err.status} Error ${err.name}`);
        }
      );
      this.Quantity = this.cart1.length;
    });
    this.setSessionData(data, id);
    this.openTallyDialog();
  }

  setSessionData(data: any, id: any) {
    setTimeout(() => {
      sessionStorage.setItem('quantity', this.Quantity);
      sessionStorage.setItem('productName', data);
      sessionStorage.setItem('productPrice', id);
    }, 500);
  }

  openTallyDialog() {
    setTimeout(() => {
      this.dialog
        .open(TallyComponent)
        .afterClosed()
        .subscribe(
          () => {
            this.clear();
          },
          (err: errorMessage) => {
            this.toastr.error(`${err.status} Error ${err.name}`);
          }
        );
    }, 700);
  }

  clear() {
    sessionStorage.clear();
  }
}
