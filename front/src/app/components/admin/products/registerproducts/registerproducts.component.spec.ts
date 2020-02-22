import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterproductsComponent } from './registerproducts.component';

describe('RegisterproductsComponent', () => {
  let component: RegisterproductsComponent;
  let fixture: ComponentFixture<RegisterproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
