import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderAddAppointmentComponent } from './calender-add-appointment.component';

describe('CalenderAddAppointmentComponent', () => {
  let component: CalenderAddAppointmentComponent;
  let fixture: ComponentFixture<CalenderAddAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderAddAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderAddAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
