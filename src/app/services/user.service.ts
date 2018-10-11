import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://app.gioping.com/api/v1';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private _http: HttpClient) { }

  addUser(data) {
    return this._http.post(this.baseUrl + '/signup/', data, {headers: this.headers})
      .pipe(
        map((response: Response) => response)
      );
  }
  getUser(data) {
    return this._http.post(this.baseUrl + '/getuser', data, {headers: this.headers})
      .pipe(
        map((response: Response) => response)
      );
  }
  searchData(strparam) {
    return this._http.get(this.baseUrl + '/search', {headers: this.headers})
      .pipe(
        map((response: Response) => response)
      );
  }
// ***************** Location CRUD ***************** //
  addLocation(data) {
    return this._http.post(this.baseUrl + '/production/location', data, {headers: this.headers})
      .pipe(
        map((response: Response) => response)
      );
  }
  updateLocation(data, id) {
    return this._http.put(this.baseUrl + '/production/location/' + id, data, {headers: this.headers})
      .pipe(
        map((response: Response) => response)
      );
  }
  getAllLocation() {
    return this._http.get(this.baseUrl + '/production/location',  {headers: this.headers})
      .pipe(
        map((response: Response) => response)
      );
  }
  locationPhoto(id, formdata) {
    return this._http.post(this.baseUrl + '/production/location/' + id + '/photo', formdata, )
      .pipe(
        map((response: Response) => response)
      );
  }
  deleteLocation(id) {
    return this._http.delete(this.baseUrl + '/production/location/' + id, {headers: this.headers})
      .pipe(
        map((response: Response) => response)
      );
  }
}
