import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class AdminService {

  constructor(private http: HttpClient) {}

  url = "http://localhost:8080";

  token = localStorage.getItem("token");

  headers = { Authorization: `${this.token}` };

  getUser(): Observable<any> {
    return this.http.get(`${this.url}/user/`);
  }
  getProduct(): Observable<any> {
    return this.http.get(`${this.url}/product/`);
  }
  getProductCategory(data: any): Observable<any> {
    return this.http.get(`${this.url}/product?category=${data}`);
  }
  getProductEdit(id: any): Observable<any> {
    return this.http.get(`${this.url}/product/${id}`);
  }
  getCart(data: any) {
    return this.http.get(`${this.url}/cart?deliveryStatus=${data}`, {
      headers: this.headers,
    });
  }
  getSelling(data: any, name: any) {
    return this.http.get(
      `${this.url}/cart?deliveryStatus=${data}&productName=${name}`,
      { headers: this.headers }
    );
  }
}