import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisnotasComponent } from './misnotas.component';

describe('MisnotasComponent', () => {
  let component: MisnotasComponent;
  let fixture: ComponentFixture<MisnotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisnotasComponent]
    });
    fixture = TestBed.createComponent(MisnotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
