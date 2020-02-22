import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproductsComponent } from './editproducts.component';

describe('EditproductsComponent', () => {
  let component: EditproductsComponent;
  let fixture: ComponentFixture<EditproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
