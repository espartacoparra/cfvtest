import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooteradminComponent } from './footeradmin.component';

describe('FooteradminComponent', () => {
  let component: FooteradminComponent;
  let fixture: ComponentFixture<FooteradminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooteradminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooteradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
