import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasInternacionalesComponent } from './noticias-internacionales.component';

describe('NoticiasInternacionalesComponent', () => {
  let component: NoticiasInternacionalesComponent;
  let fixture: ComponentFixture<NoticiasInternacionalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticiasInternacionalesComponent]
    });
    fixture = TestBed.createComponent(NoticiasInternacionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
