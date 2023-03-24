import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UserAccessComponent } from './user-access/user-access.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DeliveryComponent } from './delivery/delivery.component';

import { HttpClientModule } from '@angular/common/http';
import { ViewProductComponent } from './view-product/view-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeModule } from '../home/home.module';
import { SellingDetailsComponent } from './selling-details/selling-details.component';
import { TallyComponent } from './tally/tally.component';

@NgModule({
  declarations: [
    UserAccessComponent,
    AddProductComponent,
    DeliveryComponent,
    ViewProductComponent,
    EditProductComponent,
    SellingDetailsComponent,
    TallyComponent,
  ],
  entryComponents: [EditProductComponent, TallyComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    HomeModule,
  ],
})
export class AdminModule {}
