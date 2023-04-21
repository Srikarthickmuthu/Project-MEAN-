import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AddProduct } from "./Guard/product";
import { UserData } from "./Guard/sign-up";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  url = "http://localhost:8080";

  token = localStorage.getItem("token");

  headers = { Authorization: `${this.token}` };

  getUser() {
    return localStorage.getItem("Active-User");
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/home-path/user-home-path"]);
  }

  addUser(data: UserData) {
    return this.http.post(`${this.url}/user/`, data);
  }
  addProduct(data: any) {
    return this.http.post(`${this.url}/cart/`, data, { headers: this.headers });
  }
  getCart(user: any, data: any) {
    return this.http.get(
      `${this.url}/cart?deliveryStatus=${data}&userId=${user}`,
      { headers: this.headers }
    );
  }
  getSingle(data: number) {
    return this.http.get(`${this.url}/cart/${data}`);
  }
  getSingleProduct(data: number) {
    return this.http.get(`${this.url}/product/${data}`);
  }
  delete(data: number) {
    return this.http.delete(`${this.url}/cart/${data}`, {
      headers: this.headers,
    });
  }
  updateDelivery(id: number, data: AddProduct) {
    return this.http.put(`${this.url}/cart/${id}`, data, {
      headers: this.headers,
    });
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.url}/product/${id}`);
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.url}/user/${id}`);
  }
  editProduct(id: number, update: AddProduct) {
    return this.http.put(`${this.url}/product/${id}`, update);
  }
  addProductAdmin(data: any) {
    return this.http.post(`${this.url}/product/`, data);
  }
  addCategoryAdmin(data: any) {
    return this.http.post(`${this.url}/category`, data);
  }
  getCategory() {
    return this.http.get(`${this.url}/category`);
  }
  updateDeliveryAdmin(id: number, data: AddProduct) {
    return this.http.put(`${this.url}/cart/${id}`, data);
  }
  login(data: any) {
    return this.http.post(`${this.url}/user/validate/`, data);
  }
}
