import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { AddProduct } from './Guard/product';
import { UserData } from './Guard/sign-up';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let data: any;
  let data1: UserData;
  let product: AddProduct;
  let data2: number;
  let router: Router;
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
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    spyOn(localStorage, 'clear');
    spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get tye user', () => {
    expect(service.getUser()).toBe(localStorage.getItem('Active-User'));
  });
  it('should add the product', () => {
    expect(service.addProduct(data)).toHaveBeenCalled();
  });
  it('should add the user data', () => {
    expect(service.addUser(data1)).toHaveBeenCalled();
  });
  it('should get the single data of the user', () => {
    expect(service.getSingle(data2)).toHaveBeenCalled();
  });
  it('should get the single data of the user', () => {
    expect(service.getSingleProduct(data2)).toHaveBeenCalled();
  });
  it('should delete the added cart product', () => {
    expect(service.delete(data2)).toHaveBeenCalled();
  });
  it('should clear localStorage and navigate to home path with user home path', () => {
    service.logout();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/home-path/user-home-path']);
  });
  it('should delete the added product in the product list', () => {
    expect(service.deleteProduct(data2)).toHaveBeenCalled();
  });
  it('should delete the added user', () => {
    expect(service.deleteUser(data2)).toHaveBeenCalled();
  });
  it('should edit the products', () => {
    expect(service.editProduct(data2, product)).toHaveBeenCalled();
  });
  it('should add new product to the product list', () => {
    expect(service.addProductAdmin(product)).toHaveBeenCalled();
  });
  it('should update the delivery status', () => {
    expect(service.updateDeliveryAdmin(data2, product)).toHaveBeenCalled();
  });
});
