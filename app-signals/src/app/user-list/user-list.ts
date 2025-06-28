import { Component, inject, output } from '@angular/core';
import { UserService } from '../user';
import { IUser } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList {
  //onUserSelected = output<number>();

  userService = inject(UserService)

  users = this.userService.users;

  selectUser(user: IUser) {
    //this.onUserSelected.emit(user.id);
    this.userService.selectUser(user.id);
  }
}
