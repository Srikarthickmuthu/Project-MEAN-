import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000';

  getUser(): Observable<any> {
    return this.http.get(`${this.url}/user-details`);
  }

  getProduct(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/product/`);
  }

  getProductEdit(id: any): Observable<any> {
    return this.http.get(`http://localhost:8080/api/product/${id}`);
  }
}