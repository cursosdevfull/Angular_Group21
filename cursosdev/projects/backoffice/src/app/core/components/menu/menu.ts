import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu-service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cdev-menu',
  imports: [RouterLink, MatIconModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  menuService = inject(MenuService);
}
