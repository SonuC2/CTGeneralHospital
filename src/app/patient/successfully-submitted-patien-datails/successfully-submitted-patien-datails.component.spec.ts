import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullySubmittedPatienDatailsComponent } from './successfully-submitted-patien-datails.component';

describe('SuccessfullySubmittedPatienDatailsComponent', () => {
  let component: SuccessfullySubmittedPatienDatailsComponent;
  let fixture: ComponentFixture<SuccessfullySubmittedPatienDatailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfullySubmittedPatienDatailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfullySubmittedPatienDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
