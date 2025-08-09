import { Component, inject, Injector } from '@angular/core';
import { Container } from '../../../../../../../lib/src/lib/components/container/container';
import { Table } from '../../../../../../../lib/src/lib/components/table/table';
import { Paginator } from '../../../../../../../lib/src/lib/components/paginator/paginator';
import { StatusEnum } from '../../../../core/enums/status';
import { Metadata } from '../../../../core/types/metadata';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Status } from '../../../../shared/components/status/status';
import { ComponentBase } from '../../../../shared/components/component-base/component-base';
import { TUser } from '../../types/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'cdev-user-list',
  imports: [Container, Table, Paginator, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  providers: [UserService],
})
export class UserList extends ComponentBase<TUser, UserService> {
  dataOriginal: TUser[] = [];

  service: UserService = inject(UserService)

  metadata: Metadata<TUser> = [
    {
      field: "userId",
      label: "ID"
    },
    {
      field: "name",
      label: "Name"
    },
    {
      field: "email",
      label: "Email",
    }
  ];

  constructor(injector: Injector) {
    super(injector)
  }

  ngAfterContentInit() {
    this.loadPage(0);
  }
}
