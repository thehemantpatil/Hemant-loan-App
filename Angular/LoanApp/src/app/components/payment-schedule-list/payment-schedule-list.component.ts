import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchLoanConstraintsService } from 'src/app/services/fetch-loan-constraints.service';

@Component({
  selector: 'app-payment-schedule-list',
  templateUrl: './payment-schedule-list.component.html',
  styleUrls: ['./payment-schedule-list.component.css']
})
export class PaymentScheduleListComponent implements OnInit {
  paymentCycles: any =  [];
  constructor(private fetchLoan: FetchLoanConstraintsService) { }

  ngOnInit(): void {
    this.paymentCycles = this.fetchLoan.getPaymentCycles();
  }

}
