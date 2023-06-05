import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconmicCalenderComponent } from './econmic-calender.component';

describe('EconmicCalenderComponent', () => {
  let component: EconmicCalenderComponent;
  let fixture: ComponentFixture<EconmicCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EconmicCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EconmicCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
