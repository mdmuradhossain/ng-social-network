import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public createUser(user: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/users', user).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public getUser(email: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/users/?email' + email).subscribe(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
