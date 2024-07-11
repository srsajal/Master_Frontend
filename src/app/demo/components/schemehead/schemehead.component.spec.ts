import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeheadComponent } from './schemehead.component';

describe('SchemeheadComponent', () => {
  let component: SchemeheadComponent;
  let fixture: ComponentFixture<SchemeheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeheadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemeheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
