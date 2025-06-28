import { Component, computed, signal, effect } from '@angular/core';
import { UserList } from './user-list/user-list';
import { UserAlbumnes } from './user-albumnes/user-albumnes';
import { UserPhotos } from './user-photos/user-photos';

@Component({
  selector: 'app-root',
  imports: [UserList, UserAlbumnes, UserPhotos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'app-signals';

  userId = 0
  albumId = 0;

  operator1 = signal(40);
  operator2 = signal(50);
  message = ""

  result = computed(() => {
    console.log('Calculating result...');
    return this.operator1() + this.operator2();
  })


  constructor() {
    effect(() => {
      if (this.result() > 100) {
        this.message = "The result is greater than 100";
      } else {
        this.message = "The result is less than or equal to 100";
      }
    });


    setTimeout(() => {
      this.operator1.set(340)
      console.log('operator1 changed to', this.operator1());
    }, 4000);

    setTimeout(() => {
      this.operator2.update(previousValue => previousValue * 3)
      /*   const newValue = this.operator2() * 2;
        this.operator2.set(newValue); */
      console.log('operator2 changed to', this.operator2());
    }, 8000);
  }

  userSelected(userId: number) {
    this.userId = userId
    console.log('User selected:', userId);
  }

  albumSelected(albumId: number) {
    this.albumId = albumId;
    console.log('Album selected:', albumId);
  }
}
