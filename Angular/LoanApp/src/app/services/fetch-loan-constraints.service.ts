import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FetchLoanConstraintsService {
  private paymentCycleList: any;

  constructor(private http: HttpClient) {}

  fetchLoanConstraints() {
    const url = '';
    return this.http.get(url);
  }
  fetchLoanDeatails() {
    const url = 'https://api.jsonbin.io/b/6182944b4a82881d6c6a0f1b/4';
    return this.http.get(url);
  }

  saveLoanPaymentCycles(paymentCycleList: any) {
    this.paymentCycleList = paymentCycleList;
  }

  getPaymentCycles() {
    return this.paymentCycleList;
  }
}
