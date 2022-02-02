import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

// import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { PostService } from 'src/app/core/post.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  selectedFile: any;
  text = '';
  posts: any = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private storage: AngularFireStorage,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    if (this.userService.user == undefined || this.userService.user == null) {
      let ifUserExists = localStorage.getItem('user');
      if (ifUserExists != null) {
        this.userService.user = JSON.parse(ifUserExists);
      } else {
        this.router.navigate(['/login']);
      }
    }
    this.postService
      .getPosts()
      .then((res) => {
        this.posts = res;
      })
      .then((err) => {
        console.log(err);
      });
  }

  postSchema = {
    username: '',
    imageURL: '',
    text: '',
    likes: [],
    comments: [
      {
        username: '',
        comment: '',
      },
    ],
  };

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      let n = Date.now();
      const file = this.selectedFile;
      const filePath = `images/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            let imageUrl = fileRef.getDownloadURL();
            imageUrl.subscribe((url: any) => {
              if (url) {
                console.log(url);
                resolve(url);
              }
            });
          })
        )
        .subscribe((url: any) => {
          if (url) {
            console.log(url);
          }
        });
    });
  }

  post() {
    if (this.selectedFile != undefined || this.selectedFile != null) {
      this.uploadImage()
        .then((imageUrl) => {
          let post = {
            username: this.userService.user.username,
            text: this.text,
            imageUrl: imageUrl,
            likes: [],
            comments: [],
          };
          this.posts.push(post);
          this.postService
            .saveNewPost(post)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(imageUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
