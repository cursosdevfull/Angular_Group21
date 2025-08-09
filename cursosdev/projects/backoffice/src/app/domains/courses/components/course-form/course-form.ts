import { Component, inject, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'cdev-course-form',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
  encapsulation: ViewEncapsulation.None
})
export class CourseForm {
  title = "Add"
  fg: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<CourseForm>) {
    this.fg = new FormGroup({
      courseId: new FormControl(data?.courseId),
      name: new FormControl(data?.name || '', Validators.required),
    });

    if (data) {
      this.title = "Edit";
    }
  }

  save() {
    this.dialogRef.close(this.fg.value)
  }
}
