import { Component, OnInit } from "@angular/core";
import { AddProduct, errorMessage } from "src/app/Services/Guard/product";
import { AdminService } from "src/app/Services/admin.service";
import { UserService } from "src/app/Services/user.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { CartComponent } from "../cart/cart.component";

@Component({
  selector: "app-viewproduct",
  templateUrl: "./viewproduct.component.html",
  styleUrls: ["./viewproduct.component.css"],
  providers: [CartComponent],
})
export class ViewproductComponent implements OnInit {
  public product!: AddProduct[];
  public product1: any = [];
  public cart1!: AddProduct[];
  public id: any = [];
  public id1: any = [];
  public idValue = "";
  public category:any
  constructor(
    public adminservice: AdminService,
    public userservice: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit() {
    this.category=localStorage.getItem("category")
    this.adminservice.getProductCategory(this.category).subscribe(
      (res: AddProduct[]) => {
        this.product = res;
      },
      (err: errorMessage) => {
        this.toastr.error(`${err.status} Error ${err.message}`);
      }
    );
    this.getCart();
  }
  user = localStorage.getItem("Active-User");

  cart(data: any) {
    if (this.user != null) {
      this.id.push(data.productName);
      data.userId = this.user;
      data.deliveryStatus = "Ordered";
      data.quantity = 1;
      data.total = data.productPrice;
      this.userservice.addProduct(data).subscribe(
        () => {
          this.toastr.success("Product added to the cart..!");
          data.show = false;
        },
        (err: errorMessage) => {
          this.toastr.error(`${err.status} Error ${err.message}`);
        }
      );
      delete data._id;
    } else {
      this.toastr.warning("Please login before continue..!");
      setTimeout(() => {
        this.router.navigate(["/loginSignUp-path/login-path"]);
      }, 500);
    }
  }

  getCart() {
    this.userservice.getCart(this.user,"Ordered").subscribe((res: any) => {
      this.cart1=res
      this.cart1.map((element: any) => {
        this.id.push(element.productName);
        localStorage.setItem("id", this.id);
      });
    });
    setTimeout(() => {
      this.id1 = localStorage.getItem("id")?.split(",");
      this.product.map((element: any) => {
        if (this.id1 != undefined) {
          if (this.id1.includes(element.productName)) {
            element.show = false;
            return this.product1.push(element);
          } else {
            return this.product1.push(element);
          }
        } else {
          this.product1 = this.product;
        }
      });
    }, 1000);
  }
  added() {
    this.toastr.info("Item is already added to the cart..!");
  }
}
