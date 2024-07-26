import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardskeletonComponent } from './dashboardskeleton.component';

describe('DashboardskeletonComponent', () => {
  let component: DashboardskeletonComponent;
  let fixture: ComponentFixture<DashboardskeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardskeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardskeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
