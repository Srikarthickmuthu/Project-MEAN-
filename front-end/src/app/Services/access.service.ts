import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './admin.service';
import { errorMessage } from './Guard/product';
import { UserData } from './Guard/sign-up';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AccessService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    public adminservice: AdminService,
    public userservice:UserService
  ) {}
  url = 'http://localhost:8080';
  public user!: UserData[];

  login(data:any) {
    if (data.email === 'admin@aspire.com' && data.password === 'Admin@123') {
      localStorage.setItem('Active-User-admin', data.email);
      this.router.navigate(['/admin-path/delivery-path']);
      this.toastr.success('Welcome admin ');
    } else {
      const encode=require("jwt-encode")
      data.password=encode(data.password,"Secret")
      this.userservice.login(data).subscribe((res:any)=>{
        const user=res.token
        if (user) {
            this.toastr.success('Login Successful !!');
            localStorage.setItem('Active-User', user);
            this.router.navigate(['/home-path/user-home-path']);
          } else {
            this.toastr.error('User Not Found');
          }
        },
        (err: errorMessage) => {
          this.toastr.error(`${err.status} Error ${err.name}`);
        }
      );
    }
  }
}