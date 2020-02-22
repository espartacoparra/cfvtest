import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicorderComponent } from './publicorder.component';

describe('PublicorderComponent', () => {
  let component: PublicorderComponent;
  let fixture: ComponentFixture<PublicorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
