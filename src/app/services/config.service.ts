import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private subject = new Subject<any>();
  constructor() { }
  setToken(token: string): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken() {
    return JSON.parse(JSON.parse(localStorage.getItem('token')));
  }

  setUser(user: any): void {
    localStorage.setItem('currentuser', JSON.stringify(user));
  }

  addCart(product: any) {
    if (localStorage.getItem('cart')) {
      const products = JSON.parse(localStorage.getItem('cart'));
      const same_product = _.find(products, p => p.codigo === product.codigo);
      if (same_product) {
        same_product.count += 1;
      } else {
        product['count'] = 1;
        products.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(products));
    } else {
      product['count'] = 1;
      localStorage.setItem('cart', JSON.stringify([product]));
    }
    this.subject.next(JSON.parse(localStorage.getItem('cart')));
  }
  updateCart(data: any) {
      localStorage.setItem('cart', JSON.stringify(data));
      this.subject.next(JSON.parse(localStorage.getItem('cart')));
  }
  getCartsync() {
    return this.subject.asObservable();
  }
  getCart() {
    return JSON.parse(localStorage.getItem('cart'));
  }
  getUser() {
    return JSON.parse(JSON.parse(localStorage.getItem('currentuser')));
  }
  canAutoLogin(): boolean {
    return this.getToken() !== null;
  }

  clearcart() {
    this.subject.next();
  }

  forget(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentuser');
  }
}
