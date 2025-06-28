import { inject, Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { Post } from './post';
import { environment } from '../environtment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);

  private userSelectedSubject = new Subject<number>();
  /* userSelected$ = this.userSelectedSubject.asObservable().pipe(
    tap(id => console.log(`User selected: ${id}`)),
    switchMap(id => this.findUserById(id)),
  ); */

  private userSelected$ = this.userSelectedSubject.asObservable()

  fetchUsers$ = this.getUsers().pipe(
    tap(() => console.log("Fetching users..."))
  )

  selectedUser$ = combineLatest([this.fetchUsers$, this.userSelected$]).pipe(
    map(([userList, userId]) => userList.find(user => user.id === userId)),
  )

  postsUserSelected$ = this.userSelectedSubject.asObservable().pipe(
    tap(id => console.log(`Fetching posts for user: ${id}`)),
    switchMap(id => this.getPostByUserId(id)),
  );


  private getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
  }

  private findUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`)
  }

  private getPostByUserId(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts?userId=${id}`)
  }

  userSelected(id: number) {
    this.userSelectedSubject.next(id);
  }


}
