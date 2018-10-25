import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

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

  addCart(data: any) {
    if (localStorage.getItem('cart')) {
      const old_item = JSON.parse(localStorage.getItem('cart'));
      old_item.push(data);
      localStorage.setItem('cart', JSON.stringify(old_item));
    } else {
      localStorage.setItem('cart', JSON.stringify([data]));
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
