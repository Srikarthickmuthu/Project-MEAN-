import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { errorMessage } from 'src/app/Services/Guard/product';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cart: any = [];
  public product: any = [];
  public product1: any;
  public uniqueCart: any;
  public id: any;
  user = localStorage.getItem('Active-User');
  constructor(public userservice: UserService, public toastr: ToastrService) {}

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.userservice.getCart().subscribe(
      (res: any) => {
        this.cart = res.filter(
          (el: { userId: string; deliveryStatus: string }) => {
            return el.userId == this.user && el.deliveryStatus == 'Ordered';
          }
        );
        this.uniqueCart = this.cart.filter(
          (item: { productName: any }, index: any, self: any[]) => {
            return (
              index ===
              self.findIndex(
                (t: { productName: any }) => t.productName === item.productName
              )
            );
          }
        );
        this.cart = this.uniqueCart;
        if (this.cart.length == 0) {
          localStorage.removeItem('id');
        }
      },
      (err: errorMessage) => {
        this.toastr.error(`${err.status} Error ${err.name}`);
      }
    );
    return this.cart;
  }

  delete(data: number) {
    this.userservice.delete(data).subscribe(
      () => {
        this.getCart();
        this.toastr.warning('Product removed ..!');
      },
      (err: errorMessage) => {
        this.toastr.error(`${err.status} Error ${err.name}`);
      }
    );
  }
  increment(data: any, name: string) {
    if (data.quantity >= 10) {
      this.toastr.info('You can add upto 10 units only !');
      data.quantity = 10;
    } else if (data.quantity >= 1) {
      data.quantity++;
      data.total = data.productPrice * data.quantity;
      this.cart.map((element: any) => {
        if (element.productName == name) {
          return (this.id = element.id);
        }
      });
      this.userservice.updateDelivery(this.id, data).subscribe(
        () => {
          this.getCart();
        },
        (err: errorMessage) => {
          this.toastr.error(`${err.status} Error ${err.name}`);
        }
      );
    }
  }
  decrement(data: any, name: string) {
    if (data.quantity > 1) {
      data.quantity--;
      data.total = data.productPrice * data.quantity;
      this.cart.map((element: any) => {
        if (element.productName == name) {
          return (this.id = element.id);
        }
      });
      this.userservice.updateDelivery(this.id, data).subscribe(
        () => {
          this.getCart();
        },
        (err: errorMessage) => {
          this.toastr.error(`${err.status} Error ${err.name}`);
        }
      );
    } else if ((data.quantity = 1)) {
      this.delete(this.id);
    }
  }
 async checkout() {
  for (const element of this.cart) {
    element.deliveryStatus = 'Out for delivery';
    const id = element.id;
    await this.userservice.updateDelivery(id, element).toPromise();
  }
  this.getCart();
}

}
