import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Writer2Component } from './writer2.component';

describe('Writer2Component', () => {
  let component: Writer2Component;
  let fixture: ComponentFixture<Writer2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Writer2Component]
    });
    fixture = TestBed.createComponent(Writer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
