import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Config {
  menuAction = signal<boolean>(false);

  constructor() { }
}
