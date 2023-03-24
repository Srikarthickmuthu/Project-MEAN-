import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AddProduct } from './Guard/product';
import { UserData } from './Guard/sign-up';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  url = 'http://localhost:3000';

  getUser() {
    return localStorage.getItem('Active-User');
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/home-path/user-home-path']);
  }

  addUser(data: UserData) {
    return this.http.post(`${this.url}/user-details`, data);
  }
  addProduct(data: any) {
    return this.http.post(`http://localhost:8080/api/product/`,data);
  }
  getCart() {
    return this.http.get(`${this.url}/cart`);
  }
  getSingle(data: number) {
    return this.http.get(`${this.url}/cart/${data}`);
  }
  getSingleProduct(data: number) {
    return this.http.get(`http://localhost:8080/api/product/${data}`);
  }
  delete(data: number) {
    return this.http.delete(`${this.url}/cart/${data}`);
  }
  updateDelivery(id: number, data: AddProduct) {
    return this.http.put(`${this.url}/cart/${id}`, data);
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:8080/api/product/${id}`);
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.url}/user-details/${id}`);
  }
  editProduct(id: number, update: AddProduct) {
    return this.http.put(`http://localhost:8080/api/product/${id}`, update);
  }
  addProductAdmin(data:any) {
    console.log(data);
    return this.http.post(`http://localhost:8080/api/product/`, data);
  }
  updateDeliveryAdmin(id: number, data: AddProduct) {
    return this.http.put(`${this.url}/cart/${id}`, data);
  }
}
