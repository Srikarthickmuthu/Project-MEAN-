import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { UserData } from 'src/app/Services/Guard/sign-up';
import { ToastrService } from 'ngx-toastr';
import { errorMessage } from 'src/app/Services/Guard/product';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css'],
})
export class UserAccessComponent implements OnInit {
  public user!: UserData[];
  public access = false;

  constructor(
    private addminservice: AdminService,
    private userService:UserService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.addminservice.getUser().subscribe(
      (res: any) => {
        this.user = res;
      },
      (err: errorMessage) => {
        this.toastr.error(`${err.status} Error ${err.name}`);
      }
    );
  }

  blockUser(data: number) {
    this.userService.deleteUser(data).subscribe(
      () => {
        this.toastr.error('User blocked successfully..!');
        this.getUser();
      },
      (err: errorMessage) => {
        this.toastr.error(`${err.status} Error ${err.name}`);
      }
    );
  }
}