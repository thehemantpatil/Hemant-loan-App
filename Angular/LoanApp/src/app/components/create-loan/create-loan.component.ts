import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { paymentRecieptModal } from 'src/app/Modal/paymentReciept';
import { FetchLoanConstraintsService } from 'src/app/services/fetch-loan-constraints.service';

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

  loanConstraint = {
    interestRate: 10.0,
    paymentFrequency: ['1 Month', '3 Month', '6 Month', '12 Month'],
    paymentTerm: ['Evenly', 'Interest'],
    tradeDate: this.todaysDateObject,
  };

  @Input() loanDetails: any = {
    loanAmount: null,
    loanTenture: '1 Year',
    paymentFrequency: '1 Month',
    paymentTerm: 'Evenly',
    loanReason: null,
    maturityDate: null,
  };
  constructor(private loanConstraints: FetchLoanConstraintsService) {}

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

  createEvenlyPaymentSchedule(loanDuration: any) {
    const totalMonths = Math.floor(loanDuration / 30);
    const totalDays = loanDuration % 30;

    for (let month = 0; month < totalMonths; month++) {
      let repayDate = new Date();
      repayDate.setDate(repayDate.getDate() + 30 * (month + 1));
    }
  }

  createLoan() {
    // const tradeDuration = this.todaysDateObject.getTime();
    // const loanDurationInMs = maturityDuration - tradeDuration;
    // const loanDuration = Math.ceil(loanDurationInMs / (1000 * 3600 * 24));
    // this.createEvenlyPaymentSchedule(loanDuration);
    let loanTenture = this.loanDetails.loanTenture;
    let loanTentureArr = loanTenture.split(' ');
    let paymentFrequencyArr = this.loanDetails.paymentFrequency.split(' ');
    let paymentFrequency = parseInt(paymentFrequencyArr[0]);
    let totalYears = parseFloat(loanTentureArr[0]);
    let totalMonths = totalYears * 12;
    let totalpaymentCycles = Math.floor(totalMonths / paymentFrequency);
    let totalHalfPaymentCycle = totalMonths % paymentFrequency ? 1 : 0;
    let monthlyInterest = this.loanConstraint.interestRate / 12 / 100;

    if (this.loanDetails.paymentTerm == 'Evenly') {
      let monthlyPrincipalAmount = this.loanDetails.loanAmount / totalMonths;
      let principalAmount = this.loanDetails.loanAmount;
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
        paymentReciept.repayAmount = monthlyPrincipalAmount * paymentFrequency;
        paymentReciept.interestAmount =
          principalAmount * (monthlyInterest * paymentFrequency);
        principalAmount -= paymentReciept.repayAmount;
        paymentReciept.paymentStatus = 'unpaid';
        paymentReciept.repayDate = new Date();
        paymentReciept.repayDate.setDate(
          this.todaysDateObject.getDate() +
            30.42 * paymentFrequency * paymentCycle
        );
        this.paymentScheduleList.push(paymentReciept);
      }
      for (
        let halfPaymentCycle = 1;
        halfPaymentCycle <= totalHalfPaymentCycle;
        halfPaymentCycle++
      ) {
        let paymentReciept: any = {
          interestAmount:
            principalAmount * (monthlyInterest * (paymentFrequency/2)),
          paymentStatus: 'unpaid',
          repayAmount: principalAmount,
          repayDate: new Date(),
        };
        paymentReciept.repayDate.setDate(
          paymentReciept.repayDate.getDate() +
            30.42 * (paymentFrequency/2) * (totalpaymentCycles + 2)
        );
        this.paymentScheduleList.push(paymentReciept);
      }
    }
    console.log(this.paymentScheduleList);
  }

  generatePaymentSchedule() {}
}
