import { Component, effect, inject, input, signal } from '@angular/core';
import { IPhoto } from '../interfaces/photo.interface';
import { UserService } from '../user';

@Component({
  selector: 'app-user-photos',
  imports: [],
  templateUrl: './user-photos.html',
  styleUrl: './user-photos.css'
})
export class UserPhotos {
  //albumId = input.required<number>()

  userService = inject(UserService)

  photos = this.userService.albumPhotos

  /*   constructor() {
      effect(() => {
        this.userService.selectAlbum(this.albumId());
        console.log('Selected album ID:', this.albumId());
      })
    } */
}
