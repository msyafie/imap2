import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingwPage } from './settingw.page';

describe('SettingwPage', () => {
  let component: SettingwPage;
  let fixture: ComponentFixture<SettingwPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingwPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
