import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterddoComponent } from './masterddo.component';

describe('MasterddoComponent', () => {
  let component: MasterddoComponent;
  let fixture: ComponentFixture<MasterddoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterddoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterddoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
