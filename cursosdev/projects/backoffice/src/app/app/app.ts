import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { Header } from '../core/components/header/header';
import { Config } from '../core/services/config';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Menu } from '../core/components/menu/menu';

@Component({
  selector: 'cdev-app',
  imports: [RouterOutlet, MatSidenavModule, Header, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  isSidenavOpened = true
  modeDefault: MatDrawerMode = 'side';

  readonly config = inject(Config);

  isOpened = computed(() => this.config.menuAction())

  constructor() {
    inject(BreakpointObserver)
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small
      ])
      .subscribe({
        next: result => {
          this.config.menuAction.set(!result.matches);
          this.modeDefault = result.matches ? 'over' : 'side';
        }
      })
  }

}
