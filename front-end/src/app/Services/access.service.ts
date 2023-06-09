import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserData } from "./Guard/sign-up";
import { UserService } from "./user.service";
import { errorMessage } from "./Guard/product";

@Injectable({
  providedIn: "root",
})
export class AccessService {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public userservice: UserService
  ) {}

  public user!: UserData[];
  login(data: UserData) {
      this.userservice.login(data).subscribe(
        (res:any) => {
          if(res.role==="Admin"){
            localStorage.setItem("Active-User-admin", data.email);
            localStorage.setItem("token", res.token);
            this.router.navigate(["/admin-path/delivery-path"]);
            this.toastr.success("Welcome admin ");
          }
          else{
            this.toastr.success("Login Successful !!");
            localStorage.setItem("Active-User", data.email);
            localStorage.setItem("token", res.token);
            this.router.navigate(["/home-path/user-home-path"]);
          }
        },
        (err: errorMessage) => {
          this.toastr.error(`${err.status} Error ${err.message}`);
        }
      );
    }
  }  
