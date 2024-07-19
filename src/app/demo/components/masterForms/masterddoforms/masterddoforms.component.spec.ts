import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterddoformsComponent } from './masterddoforms.component';

describe('MasterddoformsComponent', () => {
  let component: MasterddoformsComponent;
  let fixture: ComponentFixture<MasterddoformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterddoformsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterddoformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
