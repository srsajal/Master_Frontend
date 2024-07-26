import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMinorheadFormsComponent } from './master-minorhead-forms.component';

describe('MasterMinorheadFormsComponent', () => {
  let component: MasterMinorheadFormsComponent;
  let fixture: ComponentFixture<MasterMinorheadFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterMinorheadFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterMinorheadFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
