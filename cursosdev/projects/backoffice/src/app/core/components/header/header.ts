import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Config } from '../../services/config';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'cdev-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  readonly config = inject(Config)

  showButtonMenu = signal<boolean>(false);

  router = inject(Router);

  toggleMenu() {
    this.config.menuAction.update(value => !value);
  }

  constructor() {
    inject(BreakpointObserver)
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small
      ])
      .subscribe({
        next: result => {
          this.showButtonMenu.set(!result.matches)
        }
      })
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }


}
