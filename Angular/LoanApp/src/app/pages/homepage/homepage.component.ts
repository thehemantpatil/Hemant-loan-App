import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  createLoan: boolean = false;
  allLoans: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      
      if (param.get('id') == '1') {
        this.createLoan = true;
        this.allLoans = false;
      } else if (param.get('id') == '2') {
        this.createLoan = false;
        this.allLoans = true;
      }
    });
  }
}
