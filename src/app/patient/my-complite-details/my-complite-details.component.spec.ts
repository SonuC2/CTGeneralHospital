import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompliteDetailsComponent } from './my-complite-details.component';

describe('MyCompliteDetailsComponent', () => {
  let component: MyCompliteDetailsComponent;
  let fixture: ComponentFixture<MyCompliteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCompliteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCompliteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
