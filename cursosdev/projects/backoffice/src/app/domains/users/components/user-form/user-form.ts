import { Component, inject, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'cdev-user-form',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
  encapsulation: ViewEncapsulation.None
})
export class UserForm {
  title = "Add"
  fg: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<UserForm>) {
    this.fg = new FormGroup({
      userId: new FormControl(data?.userId),
      name: new FormControl(data?.name || '', Validators.required),
      email: new FormControl(data?.email || '', [Validators.required, Validators.email]),
      password: new FormControl(data?.password || '')
    });

    if (data) {
      this.title = "Edit";
    } else {
      this.fg.get("password")?.addValidators([Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]);
    }
  }

  save() {
    this.dialogRef.close(this.fg.value)
  }
}
