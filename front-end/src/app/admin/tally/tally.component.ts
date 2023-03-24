import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProduct } from 'src/app/Services/Guard/product';

@Component({
  selector: 'app-tally',
  templateUrl: './tally.component.html',
  styleUrls: ['./tally.component.css'],
})
export class TallyComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  product!: AddProduct;
  total!: any;
  price: any;
  quantity: any;
  data!: any;
  Quantity!: number;
  Price!: number;
  Id!: number;
  ngOnInit() {
    this.values();
  }
  values() {
    this.data = sessionStorage.getItem('productName');
    this.quantity = sessionStorage.getItem('quantity');
    this.price = sessionStorage.getItem('productPrice');
    this.Price = parseInt(this.price);
    this.Quantity = parseInt(this.quantity);
  }
  close() {
    this.dialog.closeAll();
  }
}
