import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSubmissionDialogComponent } from './data-submission-dialog.component';

describe('DataSubmissionDialogComponent', () => {
  let component: DataSubmissionDialogComponent;
  let fixture: ComponentFixture<DataSubmissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSubmissionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSubmissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
