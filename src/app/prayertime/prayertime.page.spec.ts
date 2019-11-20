import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayertimePage } from './prayertime.page';

describe('PrayertimePage', () => {
  let component: PrayertimePage;
  let fixture: ComponentFixture<PrayertimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayertimePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrayertimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
