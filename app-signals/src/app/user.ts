import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IUser } from './interfaces/user.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { IAlbum } from './interfaces/album.interface';
import { IPhoto } from './interfaces/photo.interface';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient)

  private users$ = this.getUsers();

  users = toSignal(this.users$, { initialValue: [] });

  private selectedUserId = signal<number | undefined>(undefined);

  private userAlbums$ = toObservable(this.selectedUserId)
    .pipe(
      switchMap(userId => this.getAlbumsByUserId(userId ?? 0))
    )

  userAlbums = toSignal(this.userAlbums$, { initialValue: [] });

  private selectedAlbumId = signal<number | undefined>(undefined);

  private albumPhotos$ = toObservable(this.selectedAlbumId)
    .pipe(
      switchMap(albumId => this.getPhotosByAlbumId(albumId ?? 0))
    )

  albumPhotos = toSignal(this.albumPhotos$, { initialValue: [] });

  private getUsers() {
    return this.http.get<IUser[]>(`${environment.apiUrl}/users`)
  }

  private getAlbumsByUserId(userId: number) {
    return this.http.get<IAlbum[]>(`${environment.apiUrl}/albums?userId=${userId}`);
  }

  private getPhotosByAlbumId(albumId: number) {
    return this.http.get<IPhoto[]>(`${environment.apiUrl}/photos?albumId=${albumId}`);
  }

  selectUser(userId: number) {
    this.selectedUserId.set(userId);
    this.selectedAlbumId.set(0)
    console.log('Selected user ID:', userId);
  }

  selectAlbum(albumId: number) {
    this.selectedAlbumId.set(albumId);
    console.log('Selected album ID:', albumId);
  }



}
