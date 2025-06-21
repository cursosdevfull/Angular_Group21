import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Students } from './students/students';
import { Reports } from './reports/reports';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Students, Reports],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'app-providers';
}
