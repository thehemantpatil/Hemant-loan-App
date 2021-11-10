import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isInvalidCredentials: boolean = false;
  @Input() email!: string;
  @Input() password!: string;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    let userObject:any = this.authService.getLocalUserObject();
    if (userObject) {
      userObject = JSON.parse(userObject);
      console.log(typeof(userObject));
      let response = this.authService.login(
        userObject?.email,
        userObject?.password
      );
      response.subscribe((response) => {
        console.log(response, 'response coming');
        if (response) {
          this.route.navigate(['homepage', '1']);
        }
      });
    }
  }

  login() {
    console.log(this.email, this.password);
    const response = this.authService.login(this.email, this.password);
    response.subscribe((response) => {
      if (response) {
        this.authService.saveUserObject(response);
        this.route.navigate(['homepage', '1']);
      } else {
        this.isInvalidCredentials = true;
      }
    });
  }
  toggleInvalidCredential() {
    this.isInvalidCredentials = !this.isInvalidCredentials;
  }
}
