import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighChartExampleComponent } from './high-chart-example.component';

describe('HighChartExampleComponent', () => {
  let component: HighChartExampleComponent;
  let fixture: ComponentFixture<HighChartExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighChartExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighChartExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
