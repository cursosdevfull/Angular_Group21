import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { IAlbum } from '../interfaces/album.interface';
import { UserService } from '../user';

@Component({
  selector: 'app-user-albumnes',
  imports: [],
  templateUrl: './user-albumnes.html',
  styleUrl: './user-albumnes.css'
})
export class UserAlbumnes {
  userService = inject(UserService)
  //onSelectedAlbum = output<number>();

  /*   userId = input.required<number>({
      alias: 'usuarioId'
    }); */


  albums = this.userService.userAlbums

  /*   constructor() {
      effect(() => {
        console.log('User ID changed:', this.userId());
        this.userService.selectUser(this.userId());
      })
    } */


  viewAlbum(album: IAlbum) {
    //this.onSelectedAlbum.emit(album.id);
    this.userService.selectAlbum(album.id);
    console.log('Selected album ID:', album.id);
  }
}
