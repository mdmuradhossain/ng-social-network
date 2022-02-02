import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  saveNewPost(post: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/posts', post).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getPosts() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/posts').subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  updateLikes(post: any) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/posts/' + post.id, post).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  updateComments(post: any) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/posts/' + post.id, post).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
