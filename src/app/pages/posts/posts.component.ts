import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

// import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { url } from 'inspector';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private storage: AngularFireStorage
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

  selectedFile: any;
  text = '';

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
        .then((imageUrl) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
