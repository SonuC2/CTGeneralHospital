import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientDetialsComponent } from './edit-patient-detials.component';

describe('EditPatientDetialsComponent', () => {
  let component: EditPatientDetialsComponent;
  let fixture: ComponentFixture<EditPatientDetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientDetialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatientDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
