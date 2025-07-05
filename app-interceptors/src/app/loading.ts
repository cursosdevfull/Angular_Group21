import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Loading {
  loading = signal(false);

  constructor() { }

  start() {
    this.loading.set(true);
    console.log("Loading started");
  }

  stop() {
    this.loading.set(false);
    console.log("Loading stopped");
  }
}
