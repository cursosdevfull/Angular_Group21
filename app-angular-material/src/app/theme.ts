import { effect, Injectable, signal } from '@angular/core';

export type Theme = {
  id: string;
  primary: string;
  displayName: string;
}

export type StyleTheme = {
  id: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly styleThemes: StyleTheme[] = [
    { id: "light", displayName: "Claro" },
    { id: "dark", displayName: "Oscuro" },
    { id: "system", displayName: "Sistema" }
  ]

  private readonly themes: Theme[] = [
    {
      id: 'blue',
      primary: '#2196F3',
      displayName: 'Azul'
    },
    {
      id: 'green',
      primary: '#4CAF50',
      displayName: 'Verde'
    },
    {
      id: 'orange',
      primary: '#FF9800',
      displayName: 'Naranja'
    },
    {
      id: 'purple',
      primary: '#9C27B0',
      displayName: 'Morado'
    },
    {
      id: 'red',
      primary: '#F44336',
      displayName: 'Rojo'
    }
  ]

  currentStyleTheme = signal<StyleTheme>(this.styleThemes[2]);
  currentTheme = signal<Theme>(this.themes[0]);

  updateThemeClass = effect(() => {
    const theme = this.currentTheme();
    document.body.classList.remove(...this.themes.map(t => `${t.id}-theme`))
    document.body.classList.add(`${theme.id}-theme`);
  })

  getThemes(): Theme[] {
    return this.themes;
  }

  setTheme(themeId: string) {
    const theme = this.themes.find(t => t.id === themeId)
    if (theme) {
      this.currentTheme.set(theme);
    }
  }

  getStyleThemes(): StyleTheme[] {
    return this.styleThemes;
  }

  setStyleTheme(styleThemeId: string) {
    const styleTheme = this.styleThemes.find(t => t.id === styleThemeId)
    if (styleTheme) {
      this.currentStyleTheme.set(styleTheme);
    }
  }

  updateStyleThemeClass = effect(() => {
    const theme = this.currentStyleTheme();
    const colorScheme = theme.id === "system" ? "light dark" : theme.id;
    document.body.style.setProperty("color-scheme", colorScheme)
  })

  constructor() { }
}
