import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMajorHeadFormsComponent } from './sub-major-head-forms.component';

describe('SubMajorHeadFormsComponent', () => {
  let component: SubMajorHeadFormsComponent;
  let fixture: ComponentFixture<SubMajorHeadFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubMajorHeadFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubMajorHeadFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
