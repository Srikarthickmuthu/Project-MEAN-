import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { access } from 'fs';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from 'src/app/home/navbar/navbar.component';
import { AccessService } from 'src/app/Services/access.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service:AccessService;
  // let access:
  let loginForm:FormGroup;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent , NavbarComponent ],
      imports:[RouterModule,RouterTestingModule,ReactiveFormsModule],
      providers:[HttpClient,FormBuilder,HttpHandler,{
        provide:ToastrService, useValue:ToastrService
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // loginForm = {
    //   value: {
    //     email: 'user@example.com',
    //     password: 'password'
    //   },
    //   reset: jasmine.createSpy('reset')
    // };
    service = jasmine.createSpyObj('access', ['login']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call access.login with the correct arguments', () => {
    component.loginform = loginForm;
    component.login();

    expect(service.login).toHaveBeenCalledWith('user@example.com', 'password');
    expect(loginForm.reset).toHaveBeenCalled();
  });

});
