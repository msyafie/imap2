import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedReportPage } from './detailed-report.page';

describe('DetailedReportPage', () => {
  let component: DetailedReportPage;
  let fixture: ComponentFixture<DetailedReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
