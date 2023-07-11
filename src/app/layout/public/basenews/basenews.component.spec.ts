import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasenewsComponent } from './basenews.component';

describe('BasenewsComponent', () => {
  let component: BasenewsComponent;
  let fixture: ComponentFixture<BasenewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasenewsComponent]
    });
    fixture = TestBed.createComponent(BasenewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
