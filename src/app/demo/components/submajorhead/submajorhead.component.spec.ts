import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmajorheadComponent } from './submajorhead.component';

describe('SubmajorheadComponent', () => {
  let component: SubmajorheadComponent;
  let fixture: ComponentFixture<SubmajorheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmajorheadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmajorheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
