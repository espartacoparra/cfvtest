import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliccategoriesComponent } from './publiccategories.component';

describe('PubliccategoriesComponent', () => {
  let component: PubliccategoriesComponent;
  let fixture: ComponentFixture<PubliccategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubliccategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubliccategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
