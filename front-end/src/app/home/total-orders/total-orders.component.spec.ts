import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';

import { TotalOrdersComponent } from './total-orders.component';

describe('TotalOrdersComponent', () => {
  let component: TotalOrdersComponent;
  let fixture: ComponentFixture<TotalOrdersComponent>;
  let toastr: ToastrService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalOrdersComponent, NavbarComponent],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: ToastrService,
          useValue: ToastrService,
        },
      ],
      imports: [RouterModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should filter and assign cart items with delivery status "Delivered"', () => {
    const mockResponse = [
      { userId: 'user1', deliveryStatus: 'Out for delivery' },
      { userId: 'user1', deliveryStatus: 'Delivered' },
      { userId: 'user2', deliveryStatus: 'Delivered' },
    ];
    spyOn(component['userservice'], 'getCart').and.returnValue(
      of(mockResponse)
    );

    component.user = 'user1';
    component.getCart();

    expect(component.cart).toEqual([
      { userId: 'user1', deliveryStatus: 'Delivered' },
    ]);
  });

  it('should handle error from userservice', () => {
    const mockError = { status: 500, name: 'Internal Server Error' };
    spyOn(component['userservice'], 'getCart').and.returnValue(
      throwError(mockError)
    );

    spyOn(toastr, 'error');

    component.getCart();

    expect(toastr.error).toHaveBeenCalledWith(
      '500 Error Internal Server Error'
    );
  });
});
