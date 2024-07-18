import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterdetailheadformComponent } from './masterdetailheadform.component';

describe('MasterdetailheadformComponent', () => {
  let component: MasterdetailheadformComponent;
  let fixture: ComponentFixture<MasterdetailheadformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterdetailheadformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterdetailheadformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
