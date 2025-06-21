import { Component, EventEmitter, inject, Output, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user-service';
import { User } from '../user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList {
  usersService = inject(UserService)
  users$ = this.usersService.getUsers();
  users: User[] = []
  @Output() onSelectUser = new EventEmitter<number>();

  constructor() {
    console.log("UserList component initialized");
    //this.fetchUsers();
  }

  fetchUsers() {
    console.log("Fetching users...");
    this.users$.subscribe({
      next: (users) => {
        this.users = users;
        console.log("list of users", this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    })
  }

  selectUser(id: number) {
    //alert(`User with ID ${id} selected`);
    this.onSelectUser.emit(id)
  }


}
