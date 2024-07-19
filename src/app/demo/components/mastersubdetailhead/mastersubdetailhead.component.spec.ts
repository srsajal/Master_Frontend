import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersubdetailheadComponent } from './mastersubdetailhead.component';

describe('MastersubdetailheadComponent', () => {
  let component: MastersubdetailheadComponent;
  let fixture: ComponentFixture<MastersubdetailheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastersubdetailheadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MastersubdetailheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
