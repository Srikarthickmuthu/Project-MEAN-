import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/admin.service';
import { AddProduct, errorMessage } from 'src/app/Services/Guard/product';
import { TallyComponent } from '../tally/tally.component';

@Component({
  selector: 'app-selling-details',
  templateUrl: './selling-details.component.html',
  styleUrls: ['./selling-details.component.css'],
})
export class SellingDetailsComponent {
  cart!: any;
  cart1!: any;
  update!: AddProduct;
  Quantity=0;
  value = 'Delivered';

  constructor(
    public adminservice: AdminService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.adminservice.getProduct().subscribe((res: any) => {
      this.cart = res;
    });
    this.clear();
  }

  total(data: any, id: any) {
    this.adminservice.getSelling(this.value,data).subscribe((res: any) => {
      this.cart1 = res,
        (err: errorMessage) => {
          this.toastr.error(`${err.status} Error ${err.message}`);
        }
      for(const element of this.cart1){
        this.Quantity=this.Quantity+element.quantity
      }
    });
    this.setSessionData(data, id);
    this.openTallyDialog();
  }

  setSessionData(data: any, id: any) {
    setTimeout(() => {
      sessionStorage.setItem('quantity', this.Quantity.toString());
      sessionStorage.setItem('productName', data);
      sessionStorage.setItem('productPrice', id);
      this.Quantity=0;
    }, 500);
  }

  openTallyDialog() {
    setTimeout(() => {
      this.dialog
        .open(TallyComponent)
        .afterClosed()
        .subscribe(
          () => {
            this.clear();
          },
          (err: errorMessage) => {
            this.toastr.error(`${err.status} Error ${err.message}`);
          }
        );
    }, 700);
  }

  clear() {
    sessionStorage.clear();
  }
}
