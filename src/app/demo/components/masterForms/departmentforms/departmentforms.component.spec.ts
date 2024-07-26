import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentformsComponent } from './departmentforms.component';

describe('DepartmentformsComponent', () => {
  let component: DepartmentformsComponent;
  let fixture: ComponentFixture<DepartmentformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentformsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
