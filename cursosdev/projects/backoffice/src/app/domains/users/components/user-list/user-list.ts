import { Component, inject, Injector, runInInjectionContext, signal, effect } from '@angular/core';
import { Container } from '../../../../../../../lib/src/lib/components/container/container';
import { Table } from '../../../../../../../lib/src/lib/components/table/table';
import { Paginator } from '../../../../../../../lib/src/lib/components/paginator/paginator';
import { Metadata } from '../../../../core/types/metadata';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ComponentBase } from '../../../../shared/components/component-base/component-base';
import { TUser } from '../../types/user';
import { User } from '../../application/user';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserForm } from '../user-form/user-form';
import { UserAdapter } from '../../adapters/user.adapter';
import { UserPort } from '../../ports/user.port';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Confirm } from '../../../../core/components/confirm/confirm';
import * as XLSX from 'xlsx';

@Component({
  selector: 'cdev-user-list',
  imports: [Container, Table, Paginator, MatButtonModule, MatIconModule, MatTableModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  providers: [UserService, UserAdapter
  ],
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

  port: UserPort = inject(UserAdapter);

  listUsers = signal<TUser[]>([]);

  constructor(protected override injector: Injector, private readonly dialog: MatDialog, private readonly notifier: MatSnackBar) {
    super(injector)
  }

  ngAfterContentInit() {
    this.loadPage(0);
  }

  openForm(data?: any): void {
    const reference = this.dialog.open(UserForm, {
      disableClose: true,
      panelClass: 'cdev-dialog',
      data,
    })

    reference.afterClosed().subscribe(result => {
      if (!result) return;

      runInInjectionContext(this.injector, () => {
        if (result.userId) {
          this.port.update(result);
          this.notifier.open("User updated successfully", "Close", {
            duration: 3000
          });
        } else {
          this.port.create(result);
          this.notifier.open("User created successfully", "Close", {
            duration: 3000
          });
        }

        this.loadPage(this.currentPage);
      })

    })
  }

  delete(element: TUser) {
    const reference = this.dialog.open(Confirm)
    reference.componentInstance.message = `Are you sure you want to delete user ${element.name}?`

    reference.afterClosed().subscribe(result => {
      if (!result) return;

      runInInjectionContext(this.injector, () => {
        this.port.delete(element.userId)
        this.notifier.open("User deleted successfully", "Close", {
          duration: 3000
        });

        this.loadPage(this.currentPage);

      })
    });
  }

  export() {
    runInInjectionContext(this.injector, () => {
      const allUsersSignal = this.port.getAll();

      // Usar effect para detectar cuando la lista está disponible
      effect(() => {
        const usersList = allUsersSignal() as any;
        if (usersList && usersList.data && usersList.data.length > 0) {
          console.log('Lista de usuarios disponible:', usersList);
          // Aquí ya tienes la lista completa de usuarios para exportar
          this.exportToExcel(usersList.data);
        }
      });
    })
  }

  private exportToExcel(users: User[]) {
    // Aquí puedes implementar tu lógica de exportación
    // La lista completa de usuarios está disponible en el parámetro 'users'
    console.log('Exportando usuarios a Excel:', users);

    // Ejemplo de cómo podrías estructurar los datos:
    const dataForExport = users.map(user => ({
      UserId: user.userId,
      Name: user.name,
      Email: user.email
    }));

    const ws = XLSX.utils.json_to_sheet(dataForExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');

    // Exportar el archivo Excel
    XLSX.writeFile(wb, 'users.xlsx');
  }
}
