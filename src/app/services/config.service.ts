import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

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

  addCart(data: any): void {
    if (localStorage.getItem('cart')) {
      const old_item = JSON.parse(localStorage.getItem('cart'));
      old_item.push(data);
      localStorage.setItem('cart', JSON.stringify(old_item));
    } else {
      localStorage.setItem('cart', JSON.stringify([data]));
    }
  }
  updateCart(data: any): void {
      localStorage.setItem('cart', JSON.stringify(data));
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

  forget(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentuser');
  }
}
