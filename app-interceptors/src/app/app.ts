import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Loading } from './loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'app-interceptors';
  showLoading = false;

  http = inject(HttpClient)
  loading = inject(Loading)

  constructor() {


    /* this.http.get("https://jsonplaceholder.typicode.com/users").subscribe({
      next: console.log
    }) */
    /* 
        this.http.get("/v1/images/search?limit=50")
          .subscribe({
            next: console.log
          }) */


    /* this.http.get("https://api.thecatapi.com/v1/images/search?limit=50", {
      headers: {
        "x-api-key": "live_JAPG5VY77krHqVTRfAbFM8R6qdnizHAqltMw0b1T3VRkiNz9e335eoJ8o210L1km"
      }
    })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('Error Interceptor:', error.message);
          console.log("Error Interceptor Detail", error);

          return throwError(() => {
            new Error(`Error occurred: ${error.status} - ${error.message}`)
          })
        })
      )
      .subscribe({
        next: console.log
      }) */
  }

  runQuery() {
    this.http.get("/v1/images/search?limit=50")
      .subscribe({
        next: console.log
      })
  }
}
