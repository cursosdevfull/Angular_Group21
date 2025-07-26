import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Title } from '../title/title';

@Component({
  selector: 'cdev-lib-container',
  imports: [MatCardModule, Title],
  templateUrl: './container.html',
  styleUrl: './container.css'
})
export class Container {
  title = input.required<string>();
}
