import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentScheduleHeaderComponent } from './payment-schedule-header.component';

describe('PaymentScheduleHeaderComponent', () => {
  let component: PaymentScheduleHeaderComponent;
  let fixture: ComponentFixture<PaymentScheduleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentScheduleHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentScheduleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
