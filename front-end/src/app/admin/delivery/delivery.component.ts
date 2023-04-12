import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/admin.service';
import { AddProduct, errorMessage } from 'src/app/Services/Guard/product';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent implements OnInit {
  public cart!: AddProduct[];
  public update!: AddProduct;
  public value = 'Out for delivery';

  constructor(
    public userservice: UserService,
    public adminservice: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.adminservice.getCart(this.value).subscribe((res: any) => {
      this.cart = res,
        (err: errorMessage) => {
          this.toastr.error(`${err.status} Error ${err.name}`);
        }
    });
  }

  delivered(dataUser: number) {
    this.userservice.getSingle(dataUser).subscribe((res: any) => {
      this.update = res;
      this.update.deliveryStatus = 'Delivered';
      this.userservice.updateDeliveryAdmin(dataUser, this.update).subscribe(
        () => {
          this.toastr.success('Status updated successfully');
          this.getCart();
        },
        (err: errorMessage) => {
          this.toastr.error(`${err.status} Error ${err.name}`);
        }
      );
    });
  }
}
