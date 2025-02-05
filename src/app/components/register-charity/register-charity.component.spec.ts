import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCharityComponent } from './register-charity.component';

describe('RegisterCharityComponent', () => {
  let component: RegisterCharityComponent;
  let fixture: ComponentFixture<RegisterCharityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCharityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCharityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
