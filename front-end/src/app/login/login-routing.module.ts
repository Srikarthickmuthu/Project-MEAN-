import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PagenotfoundComponent } from '../home/pagenotfound/pagenotfound.component';
import { LoginGuard } from '../Services/Guard/login.guard';

const routes: Routes = [
  { path: 'login-path', component: LoginComponent  , canActivate:[LoginGuard]},
  { path: 'sign-up-path', component: SignUpComponent , canActivate:[LoginGuard]},
  { path: '', redirectTo: '/home-path/user-home-path', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
