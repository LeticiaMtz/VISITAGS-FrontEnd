import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFollowUpComponent } from './my-follow-up.component';

describe('MyFollowUpComponent', () => {
  let component: MyFollowUpComponent;
  let fixture: ComponentFixture<MyFollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
