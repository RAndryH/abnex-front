import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  public uriAPi: string = "http://localhost:3200";

  constructor(
    private http: HttpClient
  ) { }

  /** Get all cars */
  getAllCars() {
    return this.http.get(`${this.uriAPi}/`).pipe(
      map(res => {
        return res
      })
    )
  }

  /** Get one car */
  getOneCar(id: number) {
    return this.http.get(`${this.uriAPi}/${id}`).pipe(
      map(res => {
        return res
      })
    )
  }

  /** Add comment for car */
  addCommentOneCar(id: any, msg: string) {
    return this.http.post(`${this.uriAPi}/`, {id, comment: msg});
  }
}
