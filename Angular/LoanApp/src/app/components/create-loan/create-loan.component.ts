import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { paymentRecieptModal } from 'src/app/Modal/paymentReciept';
import { AuthService } from 'src/app/services/auth.service';
import { FetchLoanConstraintsService } from 'src/app/services/fetch-loan-constraints.service';
import { PostLoanDetailsService } from 'src/app/services/post-loan-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css'],
})
export class CreateLoanComponent implements OnInit {
  todaysDateObject: Date = new Date();
  todaysDate: any;
  loanTenture: any = [1];
  user!: any;
  inValidMaturityDateMessage: string = '';

  modalVisible: boolean = false;

  display = 'none';

  paymentScheduleList: any[] = [];

  isLoading: boolean = false;

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
    totalAmount: 0,
    paymentFrequency: '1 Month',
    paymentTerm: 'Evenly',
  };

  constructor(
    private loanConstraints: FetchLoanConstraintsService,
    private postLoanDetails: PostLoanDetailsService,
    private authService: AuthService,
    private route: Router
  ) {}

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
  }

  ngOnInit(): void {
    this.generateTodaysDate();

    while (this.loanTenture[this.loanTenture.length - 1] < 20) {
      this.loanTenture.push(
        this.loanTenture[this.loanTenture.length - 1] + 0.5
      );
    }

    this.user = this.authService.getLocalUserObject();
    if (this.user) this.user = JSON.parse(this.user);
    this.loanDetails.customerId = this.user.customerId;
    console.log('post loan details coming');
  }

  postLoanDetailObjects() {
    this.display = 'none';
    this.isLoading = true;
    console.log(this.loanDetails);
    console.log(this.paymentScheduleList);
    this.postLoanDetails
      .postLoanDetails(this.loanDetails, this.paymentScheduleList)
      .subscribe((response: any) => {
        console.log(response);
        console.log(response.paymentCycles, 'payment');
        this.paymentScheduleList = [];
        this.isLoading = false;
        Swal.fire({
          title: 'Loan is Created!',
          text: 'Do you want to continue',
          icon: 'success',
          confirmButtonText: 'Yes',
        }).then((result) => {
          location.reload();
        });
      });
  }

  closeModal() {
    this.paymentScheduleList = [];
    this.display = 'none';
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

    for (
      let paymentCycle = 1;
      paymentCycle <= totalpaymentCycles;
      paymentCycle++
    ) {
      let paymentReciept: any = {
        customerId: this.loanDetails.customerId,
        interestAmount: null,
        paymentStatus: null,
        repayAmount: null,
        repayDate: null,
      };
      if (this.loanDetails.paymentTerm == 'Evenly') {
        paymentReciept.repayAmount = (
          monthlyPrincipalAmount * paymentFrequency
        ).toFixed(2);
        paymentReciept.interestAmount =
          principalAmount * (monthlyInterest * paymentFrequency);
        principalAmount -= paymentReciept.repayAmount;
      } else {
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
      this.loanDetails.totalAmount +=
        paymentReciept.repayAmount + paymentReciept.interestAmount;
      this.paymentScheduleList.push(paymentReciept);
    }
    for (
      let halfPaymentCycle = 1;
      halfPaymentCycle <= totalHalfPaymentCycle;
      halfPaymentCycle++
    ) {
      let paymentReciept: any = {
        customerId: this.loanDetails.customerId,
        interestAmount:
          principalAmount * ((monthlyInterest * paymentFrequency) / 2),
        paymentStatus: 'PROJECTED',
        repayAmount: principalAmount.toFixed(2),
        repayDate: this.todaysDateObject,
      };
      paymentReciept.repayDate.setDate(
        paymentReciept.repayDate.getDate() +
          30.42 * (paymentFrequency / 2) * (totalpaymentCycles + 2)
      );
      this.loanDetails.totalAmount +=
        paymentReciept.repayAmount + paymentReciept.interestAmount;
      this.paymentScheduleList.push(paymentReciept);
    }
    if (this.loanDetails.paymentTerm == 'Interest') {
      this.paymentScheduleList[
        this.paymentScheduleList.length - 1
      ].repayAmount = principalAmount.toFixed(2);

      this.loanDetails.totalAmount += principalAmount;
    }
    this.loanDetails.maturityDate =
      this.paymentScheduleList[this.paymentScheduleList.length - 1].repayDate;
    this.display = 'block';
    console.log(this.modalVisible);
    // this.postLoanDetailObjects();
  }
}
