import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductComponent } from './view-product/view-product.component';
import { AddProductComponent } from './add-product/add-product.component';

import { DeliveryComponent } from './delivery/delivery.component';
import { UserAccessComponent } from './user-access/user-access.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SellingDetailsComponent } from './selling-details/selling-details.component';
import { PagenotfoundComponent } from '../home/pagenotfound/pagenotfound.component';
import { AdminGuard } from '../Services/Guard/admin.guard';

const routes: Routes = [
  {
    path: 'add-product-path',
    component: AddProductComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'delivery-path',
    component: DeliveryComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'user-access-path',
    component: UserAccessComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'view-product-path',
    component: ViewProductComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'edit-product-path',
    component: EditProductComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'selling-details-path',
    component: SellingDetailsComponent,
    canActivate: [AdminGuard],
  },
  { path: '', redirectTo: '/home-path/user-home-path', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
