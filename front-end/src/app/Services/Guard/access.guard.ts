import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AccessGuard implements CanActivate {
  constructor(private toastr: ToastrService , private router:Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const access = localStorage.getItem('Active-User');
    if (access != null) {
      return true;
    } else  {
      this.toastr.warning('Please login before continue..!');
      this.router.navigate(['loginSignUp-path/login-path']);
      return false;
    }
  }
}
