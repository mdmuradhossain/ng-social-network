import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  createAccountForm = this.formBuilder.group({
    email: ['', Validators.required, Validators.email],
    username: ['', Validators.required, Validators.maxLength(10)],
    password: ['', Validators.required],
  });

  createUser() {
    this.userService
      .createUser(this.createAccountForm.value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
