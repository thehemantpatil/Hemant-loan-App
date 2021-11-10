import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isInvalidCredentials: boolean = false;
  @Input() name!: string;
  @Input() email!: string;
  @Input() password!: string;
  @Input() confirmPassword!: string;

  isNameValid: boolean = false;

  isEmailValid: boolean = true;
  invalidEmailMessage: string = '';

  isPasswordValid: boolean = true;
  invalidPasswordMessage: string = '';

  isPasswordNotMatched: boolean = true;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  emailValidator() {
    var emailRegex = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$');

    if (emailRegex.test(this.email)) {
      this.isEmailValid = true;
    } else {
      this.invalidEmailMessage = 'Invalid Email';
      this.isEmailValid = false;
    }
  }

  passwordValidator() {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (this.password.match(passwordRegex)) {
      this.isPasswordValid = true;
    } else {
      this.invalidPasswordMessage =
        'Password Must Contains 1 Uppercase and Special Character';
      this.isPasswordValid = false;
      console.log('invalid password');
    }
  }

  signup() {
    if (this.password != this.confirmPassword) {
      this.isPasswordNotMatched = false;
      return;
    }
    console.log(this.name, this.email, this.password);
    if (!this.name) {
      this.isNameValid = true;
    } else {
      this.isNameValid = false;
    }

    if (!this.email) {
      this.isEmailValid = false;
      this.invalidEmailMessage = 'Required';
    } else {
      this.emailValidator();
    }

    if (!this.password) {
      this.isPasswordValid = false;
      this.invalidPasswordMessage = 'Required';
    } else {
      this.passwordValidator();
    }
    console.log(!this.isNameValid, this.isEmailValid, this.isPasswordValid);
    if (!this.isNameValid && this.isEmailValid && this.isPasswordValid) {
      console.log('all validated');
      const response = this.authService.signUp(
        this.name,
        this.email,
        this.password
      );

      response.subscribe((response) => {
        if (response) {
          this.authService.saveUserObject(response);
          this.route.navigate(['homepage', 1]);
        } else {
          this.isInvalidCredentials = true;
        }
      });
    }
  }
  toggleInvalidCredential() {
    this.isInvalidCredentials = !this.isInvalidCredentials;
  }
}
