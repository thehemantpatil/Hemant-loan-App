import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { paymentRecieptModal } from 'src/app/Modal/paymentReciept';
import { FetchLoanConstraintsService } from 'src/app/services/fetch-loan-constraints.service';
import { PostLoanDetailsService } from 'src/app/services/post-loan-details.service';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css'],
})
export class CreateLoanComponent implements OnInit {
  todaysDateObject = new Date();
  todaysDate: any;
  loanTenture: any = [1];

  inValidMaturityDateMessage: string = '';

  paymentScheduleList: any = [];

  @Input() loanTentureString: string = '1 Year';

  loanConstraint = {
    paymentFrequency: ['1 Month', '3 Month', '6 Month', '12 Month'],
    paymentTerm: ['Evenly', 'Interest'],
  };

  @Input() loanDetails: any = {
    customerId: null,
    loanAmount: null,
    loanReason: null,
    interestRate: 10.0,
    tradeDate: this.todaysDateObject,
    maturityDate: null,
    paymentFrequency: '1 Month',
    paymentTerm: 'Evenly',
  };

  constructor(private loanConstraints: FetchLoanConstraintsService,
              private postLoanDetails: PostLoanDetailsService) {}

  generateTodaysDate() {
    let day: any = this.todaysDateObject.getDate();
    let month: any = this.todaysDateObject.getMonth();
    let year = this.todaysDateObject.getFullYear();

    if (day < 10) {
      day = '0' + day.toString();
    } else {
      day = day.toString();
    }
    if (month < 10) {
      month = '0' + (parseInt(month) + 1);
    } else {
      month = parseInt(month) + 1;
    }

    this.todaysDate = day + '-' + month + '-' + year;
    console.log(this.todaysDate);
  }

  ngOnInit(): void {
    this.generateTodaysDate();
    console.log(this.loanDetails.tradeDate);
    while (this.loanTenture[this.loanTenture.length - 1] < 20) {
      this.loanTenture.push(
        this.loanTenture[this.loanTenture.length - 1] + 0.5
      );
    }

    console.log(this.loanTenture);

    // const loanConstraints = this.loanConstraints.fetchLoanConstraints();
    // loanConstraints.subscribe((response: any) => {
    //   this.loanConstraint.interestRate = response.interestRate;
    //   this.loanConstraint.paymentTerms = response.paymentTerms;
    // });
  }

  postLoanDetailObjects(){
    this.postLoanDetails.postLoanDetails(this.loanDetails,this.paymentScheduleList);
  }

  createLoan() {
 
    let loanTenture = this.loanTentureString;
    let loanTentureArr = loanTenture.split(' ');
    let paymentFrequencyArr = this.loanDetails.paymentFrequency.split(' ');
    let paymentFrequency = parseInt(paymentFrequencyArr[0]);
    let totalYears = parseFloat(loanTentureArr[0]);
    let totalMonths = totalYears * 12;
    let totalpaymentCycles = Math.floor(totalMonths / paymentFrequency);
    let totalHalfPaymentCycle = totalMonths % paymentFrequency ? 1 : 0;
    let monthlyInterest = this.loanDetails.interestRate / 12 / 100;

    let monthlyPrincipalAmount = this.loanDetails.loanAmount / totalMonths;
    let principalAmount = this.loanDetails.loanAmount;
    console.log(principalAmount);

    for (
      let paymentCycle = 1;
      paymentCycle <= totalpaymentCycles;
      paymentCycle++
    ) {
      let paymentReciept: any = {
        interestAmount: null,
        paymentStatus: null,
        repayAmount: null,
        repayDate: null,
      };
      if (this.loanDetails.paymentTerm == 'Evenly') {
        paymentReciept.repayAmount = monthlyPrincipalAmount * paymentFrequency;
        paymentReciept.interestAmount =
          principalAmount * (monthlyInterest * paymentFrequency);
        principalAmount -= paymentReciept.repayAmount;
      } else {
        console.log(this.loanDetails.paymentTerm);
        paymentReciept.repayAmount = 0;
        paymentReciept.interestAmount =
          principalAmount * (monthlyInterest * paymentFrequency);
      }
      paymentReciept.paymentStatus = 'PROJECTED';
      paymentReciept.repayDate = new Date();
      paymentReciept.repayDate.setDate(
        this.todaysDateObject.getDate() +
          30.42 * paymentFrequency * paymentCycle
      );
      console.log(paymentReciept);
      this.paymentScheduleList.push(paymentReciept);
    }
    for (
      let halfPaymentCycle = 1;
      halfPaymentCycle <= totalHalfPaymentCycle;
      halfPaymentCycle++
    ) {
      let paymentReciept: any = {
        interestAmount:
          principalAmount * ((monthlyInterest * paymentFrequency) / 2),
        paymentStatus: 'PROJECTED',
        repayAmount: principalAmount,
        repayDate: this.todaysDateObject,
      };
      paymentReciept.repayDate.setDate(
        paymentReciept.repayDate.getDate() +
          30.42 * (paymentFrequency / 2) * (totalpaymentCycles + 2)
      );
      this.paymentScheduleList.push(paymentReciept);
    }
    if (this.loanDetails.paymentTerm == 'Interest') {
      this.paymentScheduleList[
        this.paymentScheduleList.length - 1
      ].repayAmount = principalAmount;
    }
    this.loanDetails.maturityDate = this.paymentScheduleList[this.paymentScheduleList.length - 1].repayDate;
    
  }

  generatePaymentSchedule() {}
}
