import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyEnteredDetailsComponent } from './already-entered-details.component';

describe('AlreadyEnteredDetailsComponent', () => {
  let component: AlreadyEnteredDetailsComponent;
  let fixture: ComponentFixture<AlreadyEnteredDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlreadyEnteredDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlreadyEnteredDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
