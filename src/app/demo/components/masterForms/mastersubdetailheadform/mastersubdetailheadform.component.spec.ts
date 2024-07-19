import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersubdetailheadformComponent } from './mastersubdetailheadform.component';

describe('MastersubdetailheadformComponent', () => {
  let component: MastersubdetailheadformComponent;
  let fixture: ComponentFixture<MastersubdetailheadformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastersubdetailheadformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MastersubdetailheadformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
