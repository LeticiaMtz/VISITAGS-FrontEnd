import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralFollowComponent } from './general-follow.component';

describe('GeneralFollowComponent', () => {
  let component: GeneralFollowComponent;
  let fixture: ComponentFixture<GeneralFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
