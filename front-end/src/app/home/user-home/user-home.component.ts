import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { errorMessage } from 'src/app/Services/Guard/product';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  public category: any = [];
  constructor(
    public userservice: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit() {
    this.userservice.getCategory().subscribe(
      (res: any) => {
        this.category = res;
      },
      (err: errorMessage) => {
        this.toastr.error(`${err.status} Error ${err.name}`);
      }
    );
  }
  route(data:any){
    this.router.navigate(["/home-path/view-home-path"]);
  }
}
