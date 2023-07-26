import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesnotaComponent } from './imagesnota.component';

describe('ImagesnotaComponent', () => {
  let component: ImagesnotaComponent;
  let fixture: ComponentFixture<ImagesnotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesnotaComponent]
    });
    fixture = TestBed.createComponent(ImagesnotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
