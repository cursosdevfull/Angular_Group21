import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Cache {
  cache = new Map<string, HttpResponse<any>>();


  constructor() { }
}
