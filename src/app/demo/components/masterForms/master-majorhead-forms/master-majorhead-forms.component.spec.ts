import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMajorheadFormsComponent } from './master-majorhead-forms.component';

describe('MasterMajorheadFormsComponent', () => {
  let component: MasterMajorheadFormsComponent;
  let fixture: ComponentFixture<MasterMajorheadFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterMajorheadFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterMajorheadFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
