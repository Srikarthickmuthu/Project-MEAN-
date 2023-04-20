import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { errorMessage } from 'src/app/Services/Guard/product';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-total-orders',
  templateUrl: './total-orders.component.html',
  styleUrls: ['./total-orders.component.css'],
})
export class TotalOrdersComponent {
  cart: any=[];
  user: any;
  show = true;
  showCart = false;

  constructor(public userservice: UserService, private toastr: ToastrService) {
    this.user = localStorage.getItem('Active-User');
  }

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.userservice.getCart(this.user,"Delivered").subscribe(
      (res: any) => {
        this.cart=res;
      },
      (err: errorMessage) => {
        this.toastr.error(`${err.status} Error ${err.message}`);
      }
    );
  }
}