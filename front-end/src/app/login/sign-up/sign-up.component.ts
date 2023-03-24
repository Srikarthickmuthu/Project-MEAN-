import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { errorMessage } from 'src/app/Services/Guard/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  password!: string;

  constructor(public userservice: UserService, private toastr: ToastrService , private router :Router) {}

  mobNumberPattern = /^((\+91-?)|0)?[0-9]{10}$/;

  Emailpattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

onSubmit(myForm: NgForm) {
  this.userservice.addUser(myForm.value).subscribe(
    () => {
      this.handleSuccess(myForm);
    },
    (err: errorMessage) => {
      this.handleError(err);
    }
  );
}

handleSuccess(myForm: NgForm) {
  myForm.resetForm();
  this.toastr.success('Sign-up Successfull..!');
  this.router.navigate(['/loginSignUp-path/login-path'])
}

handleError(err: errorMessage) {
  this.toastr.error(`${err.status} Error ${err.name}`);
}

  countryList = [
    { countryname: 'India' },
    { countryname: 'America' },
    { countryname: 'Japan' },
    { countryname: 'China' },
    { countryname: 'Srilanka' },
    { countryname: 'Russia' },
  ];
}