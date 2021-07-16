import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /** Endpoint of users APi */
  public uriUserApi: string = "https://jsonplaceholder.typicode.com/users/";

  constructor(public http: HttpClient, private storageService: StorageService) { }

  /** Query to login with Api */
  login(user: any) {
    return this.http.get(`${this.uriUserApi}`).pipe(
      map((res: any) => {
        const finaldata: Array<string> = [];
        res.forEach((element: any) => {
          if (element.username === user.username && element.email === user.email) {
            finaldata.push(element)
          }
        });

        return finaldata
      })
    )
  }

  /** Logout function to remove session in app */
  logout() {
    return this.storageService.removeSession("abnex");
  }

}
