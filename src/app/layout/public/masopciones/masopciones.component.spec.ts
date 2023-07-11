import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasopcionesComponent } from './masopciones.component';

describe('MasopcionesComponent', () => {
  let component: MasopcionesComponent;
  let fixture: ComponentFixture<MasopcionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasopcionesComponent]
    });
    fixture = TestBed.createComponent(MasopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
