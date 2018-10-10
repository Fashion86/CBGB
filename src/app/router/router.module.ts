import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../layout/home/home.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'cart',
    component: HomeComponent
  }, {
    path: '**',
    component: HomeComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
