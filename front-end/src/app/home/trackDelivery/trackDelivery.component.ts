import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddProduct, errorMessage } from 'src/app/Services/Guard/product';
import { UserService } from 'src/app/Services/user.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-trackDelivery',
  templateUrl: './trackDelivery.component.html',
  styleUrls: ['./trackDelivery.component.css'],
  providers:[CartComponent]
})
export class TrackDeliveryComponent implements OnInit {
  public cart: any = [];
  public uniqueCart: any;
  user = localStorage.getItem('Active-User');
  constructor(private userservice:UserService , private toastr:ToastrService) { }

  ngOnInit() {
   this.getCart()
  }
  getCart() {
    this.userservice.getCart(this.user,"Out for delivery").subscribe(
      (res: any) => {
        this.cart=res
        if (this.cart.length == 0) {
          localStorage.removeItem('id');
        }
      },
      (err: errorMessage) => {
        this.toastr.error(`${err.status} Error ${err.message}`);
      }
    );
    return this.cart;
  }

}
