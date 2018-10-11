import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../layout/home/home.component';
import { CartComponent } from '../layout/cart/cart.component';
import { ProductsComponent } from '../layout/products/products.component';
import { LoginComponent } from '../layout/login/login.component';
import { RegisterComponent } from '../layout/register/register.component';
import { ForgotPasswdComponent } from '../layout/forgot-passwd/forgot-passwd.component';

const routes: Routes = [
  { path: 'home',  component: HomeComponent},
  { path: 'cart',  component: CartComponent},
  { path: 'products',  component: ProductsComponent},
  { path: 'login',  component: LoginComponent},
  { path: 'register',  component: RegisterComponent},
  { path: 'forgot-passwd',  component: ForgotPasswdComponent},
  { path: '**',  redirectTo: '/home', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
