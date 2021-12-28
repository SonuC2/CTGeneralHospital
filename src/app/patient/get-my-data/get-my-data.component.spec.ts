import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMyDataComponent } from './get-my-data.component';

describe('GetMyDataComponent', () => {
  let component: GetMyDataComponent;
  let fixture: ComponentFixture<GetMyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetMyDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
