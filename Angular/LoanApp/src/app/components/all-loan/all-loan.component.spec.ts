import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLoanComponent } from './all-loan.component';

describe('AllLoanComponent', () => {
  let component: AllLoanComponent;
  let fixture: ComponentFixture<AllLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
