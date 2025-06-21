import { inject, Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = []

  http = inject(HttpClient);

  /*   http: HttpClient;
  
    constructor(httpService: HttpClient) {
      this.http = httpService;
    } */

  /*   constructor(private http: HttpClient) {
  
    } */


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("https://jsonplaceholder.typicode.com/users")
  }

  findUserById(id: number): Observable<User> {
    return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
  }

  getPostByUserId(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
  }
}
