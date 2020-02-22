import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicproductComponent } from './publicproduct.component';

describe('PublicproductComponent', () => {
  let component: PublicproductComponent;
  let fixture: ComponentFixture<PublicproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
