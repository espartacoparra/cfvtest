import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliccartComponent } from './publiccart.component';

describe('PubliccartComponent', () => {
  let component: PubliccartComponent;
  let fixture: ComponentFixture<PubliccartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubliccartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubliccartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
