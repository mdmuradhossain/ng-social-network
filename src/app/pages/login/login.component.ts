import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private titleService: Title,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.titleService.setTitle('Login');
  }

  ngOnInit(): void {}

  loginForm = this.formBuilder.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
  });

  login() {
    this.userService.getUser(this.loginForm.value.email).then(
      (res: any) => {
        if (res.length == 0) {
          console.log("User doesn't exist");
          this.snackBar.open("User doesn't exist", 'ok');
        } else {
          if (res[0].password == this.loginForm.value.password) {
            console.log('User exists and password is correct');
            this.snackBar.open('Login successfull', 'ok', { duration: 2000 });
            this.userService.user = res[0];
            localStorage.setItem('user', JSON.stringify(res[0]));
            this.router.navigate(['/posts']);
          } else {
            console.log('User exists but password is incorrect');
            this.snackBar.open('User exists but password is incorrect', 'ok');
          }
        }
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
