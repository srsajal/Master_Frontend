import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorheadComponent } from './minorhead.component';

describe('MinorheadComponent', () => {
  let component: MinorheadComponent;
  let fixture: ComponentFixture<MinorheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinorheadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinorheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
