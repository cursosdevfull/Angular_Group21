import { Component, input } from '@angular/core';

@Component({
  selector: 'cdev-lib-title',
  imports: [],
  templateUrl: './title.html',
  styleUrl: './title.css'
})
export class Title {
  title = input.required<string>();
}
