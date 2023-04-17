import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './admin.service';
import { errorMessage } from './Guard/product';
import { UserData } from './Guard/sign-up';

@Injectable({
  providedIn: 'root',
})
export class AccessService {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    public adminservice: AdminService
  ) {}

  public user!: UserData[];

  login(email: string, password: string) {
    if (email === 'admin@aspire.com' && password === 'Admin@123') {
      localStorage.setItem('Active-User-admin', email);
      this.router.navigate(['/admin-path/delivery-path']);
      this.toastr.success('Welcome admin ');
    } else {
      this.adminservice.getUser().subscribe(
        (res: UserData[]) => {
          const user = res.find(
            (userData: UserData) => userData.email === email && userData.password === password
          );
          if (user) {
            this.toastr.success('Login Successful !!');
            localStorage.setItem('Active-User', email);
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