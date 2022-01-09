import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyNoteDialogComponent } from './reply-note-dialog.component';

describe('ReplyNoteDialogComponent', () => {
  let component: ReplyNoteDialogComponent;
  let fixture: ComponentFixture<ReplyNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyNoteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
