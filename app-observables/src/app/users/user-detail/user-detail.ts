import { Component, inject, Input } from '@angular/core';
import { UserService } from '../user-service';
import { User } from '../user';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [AsyncPipe],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetail {
  @Input() userId: number = 0;
  user: User | undefined;

  userService = inject(UserService);

  user$!: Observable<User>

  ngOnChanges() {
    this.user$ = this.userService.findUserById(this.userId)
  }
}
