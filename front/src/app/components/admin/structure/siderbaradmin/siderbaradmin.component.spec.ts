import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderbaradminComponent } from './siderbaradmin.component';

describe('SiderbaradminComponent', () => {
  let component: SiderbaradminComponent;
  let fixture: ComponentFixture<SiderbaradminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiderbaradminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiderbaradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
