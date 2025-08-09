import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chart1 } from './chart1';

describe('Chart1', () => {
  let component: Chart1;
  let fixture: ComponentFixture<Chart1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chart1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chart1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
