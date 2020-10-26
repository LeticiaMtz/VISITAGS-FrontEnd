import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerUrlComponent } from './obtener-url.component';

describe('ObtenerUrlComponent', () => {
  let component: ObtenerUrlComponent;
  let fixture: ComponentFixture<ObtenerUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObtenerUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObtenerUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
