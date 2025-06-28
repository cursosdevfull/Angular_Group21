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
  user: User | undefined;

  userService = inject(UserService);

  user$ = this.userService.selectedUser$
}
