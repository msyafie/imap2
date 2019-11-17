import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateDistancePage } from './calculate-distance.page';

describe('CalculateDistancePage', () => {
  let component: CalculateDistancePage;
  let fixture: ComponentFixture<CalculateDistancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateDistancePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateDistancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
