import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorheadComponent } from './majorhead.component';

describe('MajorheadComponent', () => {
  let component: MajorheadComponent;
  let fixture: ComponentFixture<MajorheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorheadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajorheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
