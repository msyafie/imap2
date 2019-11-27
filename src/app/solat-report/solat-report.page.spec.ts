import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolatReportPage } from './solat-report.page';

describe('SolatReportPage', () => {
  let component: SolatReportPage;
  let fixture: ComponentFixture<SolatReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolatReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolatReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
