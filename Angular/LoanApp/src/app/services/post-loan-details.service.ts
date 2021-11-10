import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostLoanDetailsService {
  constructor(private http: HttpClient) {}

  postLoanDetails(loanDetails: any, paymentCycles: any) {
    console.log('Post coming');
    const url = 'http://localhost:8080/create-loan';
    const body = {
      loanDetails: loanDetails,
      paymentCycles: paymentCycles,
    };
    return this.http.post(url, body);
  }
}
