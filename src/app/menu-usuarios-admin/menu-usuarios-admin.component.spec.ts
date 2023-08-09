import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUsuariosAdminComponent } from './menu-usuarios-admin.component';

describe('MenuUsuariosAdminComponent', () => {
  let component: MenuUsuariosAdminComponent;
  let fixture: ComponentFixture<MenuUsuariosAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuUsuariosAdminComponent]
    });
    fixture = TestBed.createComponent(MenuUsuariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
