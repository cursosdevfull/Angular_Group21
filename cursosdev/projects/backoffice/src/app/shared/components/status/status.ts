import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'cdev-status',
  imports: [NgClass],
  templateUrl: './status.html',
  styleUrl: './status.css'
})
export class Status {
  isActive: boolean = false;
}
