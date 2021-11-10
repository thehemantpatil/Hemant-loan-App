import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { PaymentScheduleComponent } from './pages/payment-schedule/payment-schedule.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  {
    path: 'homepage/:id',
    component: HomepageComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'homepage', redirectTo: 'homepage/1', pathMatch: 'full' },
  {
    path: 'payment-schedule',
    component: PaymentScheduleComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
