import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { AdminService } from './admin.service';
import { AccessService } from './access.service';
import { UserData } from './Guard/sign-up';

describe('AccessService', () => {
  let accessService: AccessService;
  let adminService: jasmine.SpyObj<AdminService>;
  let router: jasmine.SpyObj<Router>;
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const adminSpy = jasmine.createSpyObj('AdminService', ['getUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    TestBed.configureTestingModule({
      providers: [
        AccessService,
        { provide: AdminService, useValue: adminSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    });

    accessService = TestBed.inject(AccessService);
    adminService = TestBed.inject(AdminService) as jasmine.SpyObj<AdminService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create', () => {
    expect(accessService).toBeTruthy();
  });

  it('should login admin', () => {
    const email = 'admin@aspire.com';
    const password = 'Admin@123';
    accessService.login(email, password);
    expect(localStorage.getItem('Active-User-admin')).toEqual(email);
    expect(router.navigate).toHaveBeenCalledWith(['/admin-path/delivery-path']);
    expect(toastr.success).toHaveBeenCalledWith('Welcome admin ');
  });

  it('should login user', () => {
    const email = 'user@aspire.com';
    const password = 'User@123';
    const user: UserData = {
      _id: 1, email, password,
      fname: '',
      lname: '',
      number: 0,
      country: '',
      access: ''
    };
    adminService.getUser.and.returnValue(of([user]));
    accessService.login(email, password);
    expect(localStorage.getItem('Active-User')).toEqual(email);
    expect(router.navigate).toHaveBeenCalledWith(['/home-path/user-home-path']);
    expect(toastr.success).toHaveBeenCalledWith('Login Successful !!');
  });

  it('should show error when user not found', () => {
    const email = 'user@aspire.com';
    const password = 'User@123';
    adminService.getUser.and.returnValue(of([]));
    accessService.login(email, password);
    expect(localStorage.getItem('Active-User')).toBeNull();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(toastr.error).toHaveBeenCalledWith('User Not Found');
  });
});
