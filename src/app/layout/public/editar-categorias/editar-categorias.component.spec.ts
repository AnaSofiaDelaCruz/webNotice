import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriasComponent } from './editar-categorias.component';

describe('EditarCategoriasComponent', () => {
  let component: EditarCategoriasComponent;
  let fixture: ComponentFixture<EditarCategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCategoriasComponent]
    });
    fixture = TestBed.createComponent(EditarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
