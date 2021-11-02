import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchLoanConstraintsService {

  constructor(private http: HttpClient) { }

  fetchLoanConstraints(){
    const url = '';
    return this.http.get(url);
  }
}
