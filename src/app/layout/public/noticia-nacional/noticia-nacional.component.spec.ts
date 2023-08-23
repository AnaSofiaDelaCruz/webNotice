import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaNacionalComponent } from './noticia-nacional.component';

describe('NoticiaNacionalComponent', () => {
  let component: NoticiaNacionalComponent;
  let fixture: ComponentFixture<NoticiaNacionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticiaNacionalComponent]
    });
    fixture = TestBed.createComponent(NoticiaNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
