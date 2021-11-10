import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,
              private route: Router) {}

  saveUserObject(user: any) {
    localStorage.setItem('userObject', JSON.stringify(user));
    console.log(localStorage.getItem('userObject'));
  }

  getLocalUserObject(){
    return localStorage.getItem('userObject');
  }
  login(email: string, password: string) {
    const url = 'http://localhost:8080/login';
    const body = {
      email: email,
      password: password,
    };
    console.log(email, password)
    return this.http.post(url, body);
  }

  signUp(name: string, email: string, password: string) {
    const url = 'http://localhost:8080/signup';
    const body = {
      customerName: name,
      email: email,
      password: password,
    };
    return this.http.post(url, body);
  }

  logout(){
    localStorage.clear();
    this.route.navigate(['login'])
  }
}
