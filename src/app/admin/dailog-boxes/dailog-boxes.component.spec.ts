import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogBoxesComponent } from './dailog-boxes.component';

describe('DailogBoxesComponent', () => {
  let component: DailogBoxesComponent;
  let fixture: ComponentFixture<DailogBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailogBoxesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailogBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
