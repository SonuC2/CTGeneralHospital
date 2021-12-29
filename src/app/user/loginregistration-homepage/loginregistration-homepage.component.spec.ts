import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginregistrationHomepageComponent } from './loginregistration-homepage.component';

describe('LoginregistrationHomepageComponent', () => {
  let component: LoginregistrationHomepageComponent;
  let fixture: ComponentFixture<LoginregistrationHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginregistrationHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginregistrationHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
