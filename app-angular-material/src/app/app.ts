import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from './theme';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'app-angular-material';

  theme = inject(ThemeService)

  onChangeTheme(evt: MatSelectChange) {
    this.theme.setTheme(evt.value);
  }

  onChangeStyleTheme(evt: MatSelectChange) {
    this.theme.setStyleTheme(evt.value);
  }
}
