import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragePPage } from './storage-p.page';

describe('StoragePPage', () => {
  let component: StoragePPage;
  let fixture: ComponentFixture<StoragePPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoragePPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoragePPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
