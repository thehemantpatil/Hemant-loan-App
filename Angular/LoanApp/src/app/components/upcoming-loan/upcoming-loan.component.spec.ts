import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingLoanComponent } from './upcoming-loan.component';

describe('UpcomingLoanComponent', () => {
  let component: UpcomingLoanComponent;
  let fixture: ComponentFixture<UpcomingLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
