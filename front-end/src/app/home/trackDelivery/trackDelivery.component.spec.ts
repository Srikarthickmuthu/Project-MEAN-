/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrackDeliveryComponent } from './trackDelivery.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../navbar/navbar.component';
import { of, throwError } from 'rxjs';

describe('TrackDeliveryComponent', () => {
  let component: TrackDeliveryComponent;
  let fixture: ComponentFixture<TrackDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackDeliveryComponent, NavbarComponent],
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCart() method on initialization', () => {
    spyOn(component, 'getCart');
    component.ngOnInit();
    expect(component.getCart).toHaveBeenCalled();
  });

  it('should retrieve cart items from the user service and filter out delivered items', () => {
    const mockCart = [
      { id: 1, userId: '123', deliveryStatus: 'Out for delivery' },
      { id: 2, userId: '123', deliveryStatus: 'Delivered' },
      { id: 3, userId: '123', deliveryStatus: 'Out for delivery' },
    ];
    spyOn(component['userservice'], 'getCart').and.returnValue(of(mockCart));

    component.getCart();

    expect(component.cart).toEqual([mockCart[0], mockCart[2]]);
  });

  it('should remove the id from localStorage if the cart is empty', () => {
    const mockCart = [
      { id: 1, userId: '123', deliveryStatus: 'Out for delivery' },
      { id: 2, userId: '123', deliveryStatus: 'Delivered' },
      { id: 3, userId: '123', deliveryStatus: 'Out for delivery' },
    ];
    spyOn(component['userservice'], 'getCart').and.returnValue(of(mockCart));
    spyOn(localStorage, 'removeItem');

    component.getCart();

    expect(component.cart).toEqual([]);
    expect(localStorage.removeItem).toHaveBeenCalledWith('id');
  });

  it('should display an error message if the user service returns an error', () => {
    const mockError = { status: 404, name: 'Not Found' };
    spyOn(component['userservice'], 'getCart').and.returnValue(
      throwError(mockError)
    );
    spyOn(component['toastr'], 'error');

    component.getCart();

    expect(component['toastr'].error).toHaveBeenCalledWith(
      `${mockError.status} Error ${mockError.name}`
    );
  });
});
