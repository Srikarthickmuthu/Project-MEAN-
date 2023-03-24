import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let router: Router;
  let toastr: ToastrService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: ToastrService,
          useValue: ToastrService,
        },
      ],
    });
    guard = TestBed.inject(LoginGuard);
    toastr = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('should return true if neither Active-User nor Active-User-admin is set in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(toastr.warning).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should return false and redirect to user home path if Active-User is set in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('user');

    const result = guard.canActivate();

    
    expect(toastr.warning).toHaveBeenCalledWith(
      'Already logged in please logout before continue'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/home-path/user-home-path']);
    expect(result).toBeFalse();
  });
});
