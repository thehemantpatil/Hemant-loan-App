import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payment-schedule-header',
  templateUrl: './payment-schedule-header.component.html',
  styleUrls: ['./payment-schedule-header.component.css'],
})
export class PaymentScheduleHeaderComponent implements OnInit {
  userName: string = 'Hemant';
  showLogoutContainer: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  toggleLogoutContainer(event: any) {
    console.log(event.target.id);
    if (event.target.id == 'user_img') {
      console.log('coming');
      this.showLogoutContainer = !this.showLogoutContainer;
    }
  }

  hideLogoutContainer(event: any) {
    console.log(event.target.id, event.target.id);
    if (
      event.target.id != 'user_img' &&
      event.target.id != 'logout_container'
    ) {
      console.log('dkdkd');
      this.showLogoutContainer = false;
    }
    if (!event.target.id) {
      this.showLogoutContainer = false;
    }
  }

  logout() {
    this.auth.logout();
  }
}
