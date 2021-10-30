import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = '';
    const body = {
      'email': email,
      'password': password,
    };
    return this.http.post(url, body);
  }

  signUp(name: string, email: string, password: string){
    const url = '';
    const body = {
      'name': name,
      'email': email,
      'password': password,
    };
    return this.http.post(url, body);
  }
}
