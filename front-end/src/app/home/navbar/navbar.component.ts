import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  showUser!: boolean;
  showLogout!: boolean;

  constructor(
    private toastr: ToastrService,
    private userservice: UserService
  ) {}
  user = localStorage.getItem('Active-User');
  admin = localStorage.getItem('Active-User-admin');

  ngOnInit() {
    if (this.admin != null) {
      (this.showUser = false), (this.showLogout = true);
    } else if (this.user != null) {
      (this.showUser = true), (this.showLogout = true);
    } else {
      (this.showUser = true), (this.showLogout = false);
    }
  }

  logout() {
    this.toastr.success('Logout Successfull..!');
    this.showLogout = false;
    this.userservice.logout();
  }
}
