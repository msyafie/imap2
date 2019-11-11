import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NmosquePage } from './nmosque.page';

describe('NmosquePage', () => {
  let component: NmosquePage;
  let fixture: ComponentFixture<NmosquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NmosquePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NmosquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
