import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAlbumnes } from './user-albumnes';

describe('UserAlbumnes', () => {
  let component: UserAlbumnes;
  let fixture: ComponentFixture<UserAlbumnes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAlbumnes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAlbumnes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
