import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicoperationComponent } from './publicoperation.component';

describe('PublicoperationComponent', () => {
  let component: PublicoperationComponent;
  let fixture: ComponentFixture<PublicoperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicoperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicoperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
