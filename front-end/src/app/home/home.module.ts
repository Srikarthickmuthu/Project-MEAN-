import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { SumPipe } from '../Services/Pipes/sum.pipe';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TotalOrdersComponent } from './total-orders/total-orders.component';
import { TrackDeliveryComponent } from './trackDelivery/trackDelivery.component';

@NgModule({
  declarations: [
    UserHomeComponent,
    ViewproductComponent,
    CartComponent,
    SumPipe,
    PagenotfoundComponent,
    NavbarComponent,
    TotalOrdersComponent,
    TrackDeliveryComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, HttpClientModule],
  exports: [NavbarComponent],
})
export class HomeModule {}
