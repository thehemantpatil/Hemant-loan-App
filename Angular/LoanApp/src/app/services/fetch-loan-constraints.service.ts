import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FetchLoanConstraintsService {
  private paymentCycleList: any;
  private loanReason: any;
  constructor(private http: HttpClient, private auth: AuthService) {}

  fetchLoanConstraints() {
    const url = '';
    return this.http.get(url);
  }
  fetchLoanDeatails() {
    let user: any = this.auth.getLocalUserObject();
    if (user) {
      user = JSON.parse(user);
    }
    console.log(user.customerId + ' customer');
    const url = 'http://localhost:8080/fetch-loan';
    const body = {
      customerId: user.customerId,
    };
    return this.http.get(url, { params: body });
  }

  saveLoanPaymentCycles(paymentCycleList: any, loanReason: any) {
    this.paymentCycleList = paymentCycleList;
    this.loanReason = loanReason;
  }

  getPaymentCycles() {
    return this.paymentCycleList;
  }
  getLoanReason() {
    return this.loanReason;
  }
}
