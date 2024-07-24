import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSchemeHeadFormsComponent } from './master-scheme-head-forms.component';

describe('MasterSchemeHeadFormsComponent', () => {
  let component: MasterSchemeHeadFormsComponent;
  let fixture: ComponentFixture<MasterSchemeHeadFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterSchemeHeadFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterSchemeHeadFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
