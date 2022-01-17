import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedAppointmentComponent } from './requested-appointment.component';

describe('RequestedAppointmentComponent', () => {
  let component: RequestedAppointmentComponent;
  let fixture: ComponentFixture<RequestedAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
