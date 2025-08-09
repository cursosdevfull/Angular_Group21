import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu-service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'cdev-menu',
  imports: [RouterLink, MatIconModule, MatListModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  menuService = inject(MenuService);
}
