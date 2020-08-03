import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingAlertsComponent } from './tracking-alerts.component';

describe('TrackingAlertsComponent', () => {
  let component: TrackingAlertsComponent;
  let fixture: ComponentFixture<TrackingAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
