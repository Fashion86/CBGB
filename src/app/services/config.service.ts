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
