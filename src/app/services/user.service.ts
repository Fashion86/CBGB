import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://app.gioping.com/api/v1';
  // private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private _http: HttpClient) { }

  addUser(data) {
    return this._http.post(this.baseUrl + '/signup/', data)
      .pipe(
        map((response: Response) => response)
      );
  }
  login(data) {
    return this._http.post(this.baseUrl + '/login/', data)
      .pipe(
        map((response: Response) => response)
      );
  }
  getUser() {
    return this._http.get(this.baseUrl + '/usuario/', this.jwt())
      .pipe(
        map((response: Response) => response)
      );
  }
  updateUser(data) {
    return this._http.patch(this.baseUrl + '/usuario/', data, this.jwt())
      .pipe(
        map((response: Response) => response)
      );
  }
  getItem(id) {
    return this._http.get(this.baseUrl + '/item/' + id + '/', this.jwt())
      .pipe(
        map((response: Response) => response)
      );
  }
  deleteItem(id) {
    return this._http.delete(this.baseUrl + '/item/' + id + '/', this.jwt())
      .pipe(
        map((response: Response) => response)
      );
  }
  addOden(data) {
    return this._http.post(this.baseUrl + '/orden_de_compra/', data, this.jwt())
      .pipe(
        map((response: Response) => response)
      );
  }
  getOdenList() {
    return this._http.get(this.baseUrl + '/ordenes_de_compra/', this.jwt())
      .pipe(
        map((response: Response) => response)
      );
  }
  updateOden(data, id) {
    return this._http.put(this.baseUrl + '/orden_de_compra/' + id + '/', data, this.jwt())
      .pipe(
        map((response: Response) => response)
      );
  }
  getBebidaList() {
    return this._http.get(this.baseUrl + /bebidas/)
      .pipe(
        map((response: Response) => response)
      );
  }
  private jwt() {
    // create authorization header with jwt token
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
     const header =  new HttpHeaders().set('Authorization', 'JWT ' + token);
     return {headers: header};
    }

  }
}
