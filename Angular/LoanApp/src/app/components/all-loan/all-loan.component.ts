import { Component, OnInit } from '@angular/core';
import { FetchLoanConstraintsService } from 'src/app/services/fetch-loan-constraints.service';

@Component({
  selector: 'app-all-loan',
  templateUrl: './all-loan.component.html',
  styleUrls: ['./all-loan.component.css']
})
export class AllLoanComponent implements OnInit {
  loanDetails : any[] = []; 
  constructor(private fetchLoan:FetchLoanConstraintsService) { }

  ngOnInit(): void {
     let loanDetails = this.fetchLoan.fetchLoanDeatails();
     loanDetails.subscribe((response:any) => {
      this.loanDetails.push(response);
      this.fetchLoan.saveLoanPaymentCycles(response.paymentCycles);
      console.log(loanDetails)
    })
  }

  

}
