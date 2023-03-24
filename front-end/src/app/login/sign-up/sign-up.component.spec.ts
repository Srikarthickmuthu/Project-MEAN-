import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { NavbarComponent } from 'src/app/home/navbar/navbar.component';
import { errorMessage } from 'src/app/Services/Guard/product';
import { UserService } from 'src/app/Services/user.service';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let userService:UserService
  let fixture: ComponentFixture<SignUpComponent>;
  let myForm:NgForm;
  let toastr:ToastrService;
  let router:Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent, NavbarComponent ],
      imports:[FormsModule, RouterModule , RouterTestingModule],
      providers:[HttpClient,HttpHandler,{
        provide:ToastrService, useValue:{error: () => {} ,success:()=>{}}
      },UserService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    userService=TestBed.inject(UserService)
    toastr=TestBed.inject(ToastrService)
    router=TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call addUser method of UserService and handle success', () => {
    spyOn(userService, 'addUser').and.returnValue(of<any>(null)); // mock the service method
    component.onSubmit(myForm);

    expect(userService.addUser).toHaveBeenCalledWith(myForm.value); // check if service method is called with correct parameter
    expect(component.handleSuccess).toHaveBeenCalled(); // check if handleSuccess method is called
    expect(component.handleError).not.toHaveBeenCalled(); // check if handleError method is not called
  });
  it('should display the error message correctly', () => {
    const errorMessage = {
      status: 404,
      name: 'Not Found',
    };
    component.handleError(errorMessage);

    expect(toastr.error).toHaveBeenCalledWith(`${errorMessage.status} Error ${errorMessage.name}`);
  });
  it('should reset the form, display a success message, and navigate to the login page', () => {

    component.handleSuccess(myForm);

    expect(myForm.resetForm).toHaveBeenCalled();
    expect(toastr.success).toHaveBeenCalledWith('Sign-up Successfull..!');
    expect(router.navigate).toHaveBeenCalledWith(['/loginSignUp-path/login-path']);
  });
});
