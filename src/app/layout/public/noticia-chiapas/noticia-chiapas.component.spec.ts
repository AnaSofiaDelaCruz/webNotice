import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaChiapasComponent } from './noticia-chiapas.component';

describe('NoticiaChiapasComponent', () => {
  let component: NoticiaChiapasComponent;
  let fixture: ComponentFixture<NoticiaChiapasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticiaChiapasComponent]
    });
    fixture = TestBed.createComponent(NoticiaChiapasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
