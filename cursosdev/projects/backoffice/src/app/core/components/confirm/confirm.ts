import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'cdev-confirm',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm.html',
  styleUrl: './confirm.css'
})
export class Confirm {
  message = "Are you sure you want to proceed with this action?"
}
