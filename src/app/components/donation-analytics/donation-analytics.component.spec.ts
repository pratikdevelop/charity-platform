import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationAnalyticsComponent } from './donation-analytics.component';

describe('DonationAnalyticsComponent', () => {
  let component: DonationAnalyticsComponent;
  let fixture: ComponentFixture<DonationAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
