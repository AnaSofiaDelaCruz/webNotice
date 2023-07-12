import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWriterComponent } from './home-writer.component';

describe('HomeWriterComponent', () => {
  let component: HomeWriterComponent;
  let fixture: ComponentFixture<HomeWriterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeWriterComponent]
    });
    fixture = TestBed.createComponent(HomeWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
