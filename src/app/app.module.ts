import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {SlideshowModule} from 'ng-simple-slideshow';
import { SidebarModule } from 'ng-sidebar';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './router/router.module';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './layout/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CartComponent } from './layout/cart/cart.component';
import { HelpersComponent } from './layout/helpers/helpers.component';
import { LoginComponent } from './layout/login/login.component';
import { ProductsComponent } from './layout/products/products.component';
import { RegisterComponent } from './layout/register/register.component';
import { ForgotPasswdComponent } from './layout/forgot-passwd/forgot-passwd.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    HelpersComponent,
    LoginComponent,
    ProductsComponent,
    RegisterComponent,
    ForgotPasswdComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    MaterialModule,
    SlideshowModule,
    SidebarModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
