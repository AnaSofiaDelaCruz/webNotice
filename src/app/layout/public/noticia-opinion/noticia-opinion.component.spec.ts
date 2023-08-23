import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaOpinionComponent } from './noticia-opinion.component';

describe('NoticiaOpinionComponent', () => {
  let component: NoticiaOpinionComponent;
  let fixture: ComponentFixture<NoticiaOpinionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticiaOpinionComponent]
    });
    fixture = TestBed.createComponent(NoticiaOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
