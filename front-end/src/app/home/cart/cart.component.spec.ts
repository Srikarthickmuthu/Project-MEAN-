import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartComponent } from './cart.component';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import { AddProduct } from 'src/app/Services/Guard/product';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let userService: UserService;
  let toastr: ToastrService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent, NavbarComponent],
      providers: [
        HttpClient,
        HttpHandler,
        {
          provide: ToastrService,
          useValue: { warning: () => {}, error: () => {}, info: () => {} },
        },
      ],
      imports: [RouterModule, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService.delete and show toastr message on success', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'delete').and.returnValue(of<any>(null));
    spyOn(TestBed.inject(ToastrService), 'warning');
    component.delete(123);
    expect(userService.delete).toHaveBeenCalledWith(123);
    expect(component.getCart()).toEqual([]);
    expect(TestBed.inject(ToastrService).warning).toHaveBeenCalledWith(
      'Product removed ..!'
    );
  });
  it('should set quantity to 10 and show info message if quantity is already 10', () => {
    const data = { quantity: 10, productPrice: 5, total: 50 };
    component.increment(data, 'productName');
    spyOn(TestBed.inject(ToastrService), 'info');
    expect(toastr.info).toHaveBeenCalledWith(
      'You can add upto 10 units only !'
    );
    expect(data.quantity).toEqual(10);
  });

  it('should increment quantity and update delivery if quantity is between 1 and 9', () => {
    const data: AddProduct = {
      quantity: 5,
      productPrice: 5,
      total: 25,
      length: 1,
      userId: '1',
      _id: 1,
      show: true,
      productName: 'abc',
      productImage: 'abc',
      deliveryStatus: 'ordered',
      productType: 'kilo',
    };
    const name = 'product name';
    const expectedData = { ...data, quantity: 6, total: 30 };
    component.increment(data, name);
    expect(data.quantity).toEqual(6);
    expect(data.total).toEqual(expectedData.total);
    expect(userService.updateDelivery).toHaveBeenCalledWith(
      expectedData._id,
      expectedData
    );
  });

  it('should decrement the quantity of an item in the cart', () => {
    const cartItem: AddProduct = {
      quantity: 5,
      productPrice: 5,
      total: 25,
      length: 1,
      userId: '1',
      _id: 1,
      show: true,
      productName: 'abc',
      productImage: 'abc',
      deliveryStatus: 'ordered',
      productType: 'kilo',
    };
    component.cart = [cartItem];
    spyOn(userService, 'updateDelivery').and.returnValue(of<any>(null));
    spyOn(component, 'getCart');
    component.decrement(cartItem, 'test');
    expect(cartItem.quantity).toBe(1);
    expect(cartItem.total).toBe(10);
    expect(userService.updateDelivery).toHaveBeenCalledWith(
      cartItem._id,
      cartItem
    );
    expect(component.getCart).toHaveBeenCalled();
  });

  it('should delete an item from the cart if the quantity is 1', () => {
    const cartItem: AddProduct = {
      quantity: 5,
      productPrice: 5,
      total: 25,
      length: 1,
      userId: '1',
      _id: 1,
      show: true,
      productName: 'abc',
      productImage: 'abc',
      deliveryStatus: 'ordered',
      productType: 'kilo',
    };
    component.cart = [cartItem];
    spyOn(component, 'delete');
    component.decrement(cartItem, 'test');
    expect(component.delete).toHaveBeenCalledWith(1);
  });

  it('should show an error message if the update request fails', () => {
    const cartItem: AddProduct = {
      quantity: 5,
      productPrice: 5,
      total: 25,
      length: 1,
      userId: '1',
      _id: 1,
      show: true,
      productName: 'abc',
      productImage: 'abc',
      deliveryStatus: 'ordered',
      productType: 'kilo',
    };
    component.cart = [cartItem];
    const error = { status: 500, name: 'Internal Server Error' };
    spyOn(userService, 'updateDelivery').and.returnValue(throwError(error));
    spyOn(toastr, 'error');
    component.decrement(cartItem, 'test');
    expect(toastr.error).toHaveBeenCalledWith(
      `${error.status} Error ${error.name}`
    );
  });

  it('should filter and return the unique cart items', () => {
    const mockResponse = [
      { userId: '1', deliveryStatus: 'Ordered', productName: 'Product 1' },
      { userId: '1', deliveryStatus: 'Ordered', productName: 'Product 2' },
      { userId: '1', deliveryStatus: 'Ordered', productName: 'Product 1' },
      {
        userId: '1',
        deliveryStatus: 'Out for delivery',
        productName: 'Product 3',
      },
    ];

    spyOn(component.userservice, 'getCart').and.returnValue(of(mockResponse));
    spyOn(component.toastr, 'error');

    component.getCart();

    expect(component.cart).toEqual([
      { userId: '1', deliveryStatus: 'Ordered', productName: 'Product 1' },
      { userId: '1', deliveryStatus: 'Ordered', productName: 'Product 2' },
    ]);
    expect(localStorage.removeItem).toHaveBeenCalledWith('id');
    expect(component.toastr.error).not.toHaveBeenCalled();
  });
  it('should update delivery status to "Out for delivery" for all items in the cart and call getCart()', () => {
    const mockCart = [
      { id: 1, deliveryStatus: 'Ordered' },
      { id: 2, deliveryStatus: 'Ordered' },
    ];
    spyOn(userService, 'getCart').and.returnValue(of(mockCart));
    spyOn(userService, 'updateDelivery').and.returnValue(of({}));

    component.checkout();

    expect(userService.updateDelivery).toHaveBeenCalledTimes(2);
    expect(userService.updateDelivery).toHaveBeenCalledWith(1, {
      _id: 1,
      deliveryStatus: 'Out for delivery',
      productImage: 'acx',
      productName: 'sd',
      productPrice: 1223,
      productType: 'sa',
      length: 1,
      total: 2,
      show: true,
      userId: 'qw',
      quantity: 1,
    });
    expect(userService.updateDelivery).toHaveBeenCalledWith(2, {
      _id: 1,
      deliveryStatus: 'Out for delivery',
      productImage: 'acx',
      productName: 'sd',
      productPrice: 1223,
      productType: 'sa',
      length: 1,
      total: 2,
      show: true,
      userId: 'qw',
      quantity: 1,
    });
    expect(userService.getCart).toHaveBeenCalled();
  });
  it('should update delivery status of each cart item and call updateDelivery for each item', () => {
    const mockCart = [      {id: 1, name: 'Item 1', deliveryStatus: 'In progress'},      {id: 2, name: 'Item 2', deliveryStatus: 'In progress'},      {id: 3, name: 'Item 3', deliveryStatus: 'In progress'}    ];
    spyOn(userService, 'updateDelivery').and.returnValue(of<any>(null));

    component.cart = mockCart;
    component.checkout();

    expect(component.cart[0].deliveryStatus).toBe('Out for delivery');
    expect(component.cart[1].deliveryStatus).toBe('Out for delivery');
    expect(component.cart[2].deliveryStatus).toBe('Out for delivery');
    expect(userService.updateDelivery).toHaveBeenCalledTimes(3);
    expect(userService.updateDelivery).toHaveBeenCalledWith(1, component.cart[0]);
    expect(userService.updateDelivery).toHaveBeenCalledWith(2, component.cart[1]);
    expect(userService.updateDelivery).toHaveBeenCalledWith(3, component.cart[2]);
  });

  it('should call getCart() after updating delivery status', () => {
    spyOn(component, 'getCart');

    component.checkout();

    expect(component.getCart).toHaveBeenCalled();
  });
});
