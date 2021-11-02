import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PaymentScheduleComponent } from './pages/payment-schedule/payment-schedule.component';
import { CreateLoanComponent } from './components/create-loan/create-loan.component';
import { AllLoanComponent } from './components/all-loan/all-loan.component';
import { UpcomingLoanComponent } from './components/upcoming-loan/upcoming-loan.component';
import { HomepageHeaderComponent } from './components/homepage-header/homepage-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    PaymentScheduleComponent,
    CreateLoanComponent,
    AllLoanComponent,
    UpcomingLoanComponent,
    HomepageHeaderComponent,
    CreateLoanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
