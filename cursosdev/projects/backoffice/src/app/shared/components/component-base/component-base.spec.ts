import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentBase } from './component-base';

describe('ComponentBase', () => {
  let component: ComponentBase;
  let fixture: ComponentFixture<ComponentBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentBase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentBase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
