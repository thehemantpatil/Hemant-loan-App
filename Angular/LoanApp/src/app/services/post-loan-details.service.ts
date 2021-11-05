import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostLoanDetailsService {
  constructor(private http: HttpClient) {}

  postLoanDetails(loanDetails: any, paymentCycles: any) {
    const url = '';
    const body = {
      loanDetails: loanDetails,
      paymentCycles: paymentCycles,
    };
    this.http.post(url, body);
  }
}
