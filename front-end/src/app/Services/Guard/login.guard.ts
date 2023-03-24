import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private toastr: ToastrService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const access = localStorage.getItem('Active-User');
    const admin = localStorage.getItem('Active-User-admin');
    if (access != null || admin != null) {
      this.toastr.warning('Already logged in please logout before continue');
      this.router.navigate(['/home-path/user-home-path']);
      return false;
    } else {
      return true;
    }
  }
}
