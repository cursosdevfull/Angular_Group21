import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPhotos } from './user-photos';

describe('UserPhotos', () => {
  let component: UserPhotos;
  let fixture: ComponentFixture<UserPhotos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPhotos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPhotos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
