import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from '../Services/Guard/access.guard';
import { CartComponent } from './cart/cart.component';
import { TotalOrdersComponent } from './total-orders/total-orders.component';
import { TrackDeliveryComponent } from './trackDelivery/trackDelivery.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';

const routes: Routes = [
  { path: 'user-home-path', component: UserHomeComponent },
  {
    path: 'user-cart-path',
    component: CartComponent,
    canActivate: [AccessGuard],
  },
  {
    path: 'view-home-path',
    component: ViewproductComponent,
  },
  {
    path: 'total-orders-path',
    component: TotalOrdersComponent,
    canActivate: [AccessGuard],
  },
  {
    path:'track-delivery-path',
    component:TrackDeliveryComponent,
    canActivate:[AccessGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
