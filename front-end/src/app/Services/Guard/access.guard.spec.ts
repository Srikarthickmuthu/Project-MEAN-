import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccessGuard } from './access.guard';

describe('AccessGuard', () => {
  let guard: AccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: ToastrService,
          useValue: { warning: () => {} },
        },
      ],
    });
    guard = TestBed.inject(AccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  describe('canActivate', () => {
    let toastr: ToastrService;
    let router: Router;

    beforeEach(() => {
      toastr = TestBed.inject(ToastrService);
      router = TestBed.inject(Router);
      guard = TestBed.inject(AccessGuard);
    });

    it('should return true if Active-User is set in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue('someValue');

      const result = guard.canActivate();

      expect(result).toBeTrue();
    });

    it('should return false and redirect to login path if Active-User is not set in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      spyOn(toastr, 'warning');
      spyOn(router, 'navigate');

      const result = guard.canActivate();

      expect(result).toBeFalse();
      expect(toastr.warning).toHaveBeenCalledWith(
        'Please login before continue..!'
      );
      expect(router.navigate).toHaveBeenCalledWith([
        'loginSignUp-path/login-path',
      ]);
    });
  });
});
