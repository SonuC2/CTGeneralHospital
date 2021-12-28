import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVisitComponent } from './patient-visit.component';

describe('PatientVisitComponent', () => {
  let component: PatientVisitComponent;
  let fixture: ComponentFixture<PatientVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
