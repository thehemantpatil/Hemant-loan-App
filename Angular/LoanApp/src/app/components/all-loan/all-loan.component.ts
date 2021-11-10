import { Component, OnInit } from '@angular/core';
import { NavigationCancel, Router } from '@angular/router';
import { FetchLoanConstraintsService } from 'src/app/services/fetch-loan-constraints.service';

@Component({
  selector: 'app-all-loan',
  templateUrl: './all-loan.component.html',
  styleUrls: ['./all-loan.component.css']
})
export class AllLoanComponent implements OnInit {
  loanDetails : any[] = []; 
  constructor(private fetchLoan:FetchLoanConstraintsService,
              private route:Router) { }

  ngOnInit(): void {
     let loanDetails = this.fetchLoan.fetchLoanDeatails();
     loanDetails.subscribe((response:any) => {
      console.log(response);
      this.loanDetails = response;
      console.log(loanDetails)
    })
  }

  onLoanClick(paymentCycle:any, loanReason:any){
      this.fetchLoan.saveLoanPaymentCycles(paymentCycle, loanReason);
      this.route.navigate(['/payment-schedule']);
      
  }

  

}
