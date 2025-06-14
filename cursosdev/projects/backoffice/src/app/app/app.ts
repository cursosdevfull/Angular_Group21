import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'cdev-app',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  userName = 'Juan Pérez';

  menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'courses', label: 'Cursos', icon: 'book' },
    { id: 'students', label: 'Estudiantes', icon: 'users' },
    { id: 'reports', label: 'Reportes', icon: 'chart' },
    { id: 'settings', label: 'Configuración', icon: 'settings' }
  ];
}
