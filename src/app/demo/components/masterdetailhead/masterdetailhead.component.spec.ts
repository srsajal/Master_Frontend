import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterdetailheadComponent } from './masterdetailhead.component';

describe('MasterdetailheadComponent', () => {
  let component: MasterdetailheadComponent;
  let fixture: ComponentFixture<MasterdetailheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterdetailheadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterdetailheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
