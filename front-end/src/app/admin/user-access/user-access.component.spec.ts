import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { NavbarComponent } from 'src/app/home/navbar/navbar.component';
import { AdminService } from 'src/app/Services/admin.service';
import { UserService } from 'src/app/Services/user.service';

import { UserAccessComponent } from './user-access.component';

describe('UserAccessComponent', () => {
  let component: UserAccessComponent;
  let fixture: ComponentFixture<UserAccessComponent>;
  let addminservice:AdminService;
  let toastr:ToastrService;
  let userService:UserService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, RouterTestingModule],
      declarations: [UserAccessComponent, NavbarComponent],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: ToastrService,
          useValue: ToastrService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAccessComponent);
    component = new UserAccessComponent(addminservice,userService,toastr);
    toastr=TestBed.inject(ToastrService);
    addminservice = jasmine.createSpyObj('addminservice', ['deleteUser']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should block user successfully and display success message', () => {
    const data = 123;
    component.blockUser(data);
    expect(userService.deleteUser).toHaveBeenCalledWith(data);
    expect(toastr.error).toHaveBeenCalledWith('User blocked successfully..!');
  });

  it('should display error message when deleteUser function returns an error', () => {
    const data = 123;
    const error = { status: 404, name: 'Not Found' };
    component.blockUser(data);
    expect(userService.deleteUser).toHaveBeenCalledWith(data);
    expect(toastr.error).toHaveBeenCalledWith(`${error.status} Error ${error.name}`);
  });

});
