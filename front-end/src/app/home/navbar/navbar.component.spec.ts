import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let service: UserService;
  let toastr:ToastrService;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  beforeEach(async () => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUser']);
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        {
          provide: ToastrService,
          useValue: { success: () => {} ,toastrServiceSpy},
        },{ provide: UserService, useValue: userServiceSpy },
        HttpClient,
        HttpHandler,
      ],
      imports: [RouterModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    toastr=TestBed.inject(ToastrService);
    service=TestBed.inject(UserService);
    toastr = jasmine.createSpyObj('ToastrService', ['success']);
    service = jasmine.createSpyObj('UserService', ['logout']);
    component = new NavbarComponent(toastr, service);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display success message and logout user', () => {
    spyOn(component, 'logout').and.callThrough();
    component.showLogout = true;
    component.logout();
    expect(toastr.success).toHaveBeenCalledWith('Logout Successfull..!');
    expect(component.showLogout).toBe(false);
    expect(service.logout).toHaveBeenCalled();
  });
  
});
