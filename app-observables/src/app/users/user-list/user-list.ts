import { Component, EventEmitter, inject, Output, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user-service';
import { User } from '../user';
import { AsyncPipe } from '@angular/common';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList {
  messageError = ""

  usersService = inject(UserService)
  users$ = this.usersService.fetchUsers$.pipe(
    tap(() => this.messageError = ""),
    catchError(error => {
      console.log("Error fetching users:", error)
      this.messageError = "Error fetching users. Please try again later."
      return EMPTY
    })
  )

  users: User[] = []

  constructor() {
    console.log("UserList component initialized");
  }

  selectUser(id: number) {
    this.usersService.userSelected(id);
  }


}
