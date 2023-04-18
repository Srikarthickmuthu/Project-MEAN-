import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './admin.service';
import { UserData } from './Guard/sign-up';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AccessService {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public adminservice: AdminService,
    public userservice:UserService,
  

  ) {}

  public user!: UserData[];
  login(data:any){
    if (data.email === 'admin@aspire.com' && data.password === 'Admin@123') {
          localStorage.setItem('Active-User-admin', data.email);
          this.router.navigate(['/admin-path/delivery-path']);
          this.toastr.success('Welcome admin ');
        } else {
          this.userservice.login(data).subscribe(
          ()=>{
            this.toastr.success('Login Successful !!');
            localStorage.setItem('Active-User', data.email);
            this.router.navigate(['/home-path/user-home-path']);
          },
          (err:any)=>{
            this.toastr.error(`${err.status} Error ${err.message}`);
          })
        }
  }
}