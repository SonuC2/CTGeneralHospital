import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterRegLendingPageComponent } from './after-reg-lending-page.component';

describe('AfterRegLendingPageComponent', () => {
  let component: AfterRegLendingPageComponent;
  let fixture: ComponentFixture<AfterRegLendingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterRegLendingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterRegLendingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
