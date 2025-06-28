import { Component, inject, Input } from '@angular/core';
import { UserService } from '../user-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-post',
  imports: [AsyncPipe],
  templateUrl: './user-post.html',
  styleUrl: './user-post.css'
})
export class UserPost {
  userService = inject(UserService);
  posts$ = this.userService.postsUserSelected$
}
