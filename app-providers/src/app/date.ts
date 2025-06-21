import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class DateService {

  constructor() { }

  getCurrentDate(): Date {
    return new Date();
  }
}
