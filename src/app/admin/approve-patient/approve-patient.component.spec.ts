import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePatientComponent } from './approve-patient.component';

describe('ApprovePatientComponent', () => {
  let component: ApprovePatientComponent;
  let fixture: ComponentFixture<ApprovePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovePatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
