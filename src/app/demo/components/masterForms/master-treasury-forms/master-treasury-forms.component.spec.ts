import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTreasuryFormsComponent } from './master-treasury-forms.component';

describe('MasterTreasuryFormsComponent', () => {
  let component: MasterTreasuryFormsComponent;
  let fixture: ComponentFixture<MasterTreasuryFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterTreasuryFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterTreasuryFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
