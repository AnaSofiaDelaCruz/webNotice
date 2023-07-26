import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWritterComponent } from './list-writter.component';

describe('ListWritterComponent', () => {
  let component: ListWritterComponent;
  let fixture: ComponentFixture<ListWritterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListWritterComponent]
    });
    fixture = TestBed.createComponent(ListWritterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
