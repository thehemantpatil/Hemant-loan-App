import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-homepage-header',
  templateUrl: './homepage-header.component.html',
  styleUrls: ['./homepage-header.component.css'],
})
export class HomepageHeaderComponent implements OnInit {
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
  }

  logout() {
    this.auth.logout();
  }
}
