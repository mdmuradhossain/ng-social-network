import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

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
}
