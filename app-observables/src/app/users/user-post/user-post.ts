import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../post';
import { UserService } from '../user-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-post',
  imports: [AsyncPipe],
  templateUrl: './user-post.html',
  styleUrl: './user-post.css'
})
export class UserPost {
  @Input() userId: number = 0;

  userService = inject(UserService);

  posts$!: Observable<Post[]>;

  ngOnChanges() {
    this.posts$ = this.userService.getPostByUserId(this.userId)
  }
}
