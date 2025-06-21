import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { UserList } from './users/user-list/user-list';
import { UserDetail } from './users/user-detail/user-detail';
import { UserPost } from './users/user-post/user-post';

@Component({
  selector: 'app-root',
  imports: [UserList, UserDetail, UserPost],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'app-observables';
  userSelected: number = 0;

  constructor() {
    // this.executePromise();

    //this.executeObservable();
  }

  executePromise() {
    const promise = new Promise((resolve, reject) => {
      const http = new XMLHttpRequest()
      http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
          if (http.status === 200) {
            const response = JSON.parse(http.responseText);
            resolve(response)
            //console.log(response);
          } else {
            reject(http.statusText)
            console.error('Error fetching data:', http.status, http.statusText);
          }
        }
      };

      http.open("get", "https://jsonplaceholder.typicode.com/users", true);
      http.send();
    })

    promise
      .then((data) => {
        console.log('Data fetched successfully:', data);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      })

    /* promise.then((data) => {
      console.log('Data fetched successfully:', data);
    })

    promise.catch((error) => {
      console.log('Error fetching data:', error);
    }) */
  }

  executeObservable() {
    const observable = new Observable((observer: Observer<any>) => {
      const http = new XMLHttpRequest();
      http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
          if (http.status === 200) {
            const response = JSON.parse(http.responseText);
            observer.next(response);
            observer.complete();
          } else {
            observer.error(http.statusText);
          }
        }
      };

      http.open("get", "https://jsonplaceholder.typicode.com/users", true);
      http.send();
    });

    observable.subscribe({
      next: (data) => console.log('Data fetched successfully:', data),
      error: (error) => console.log('Error fetching data:', error),
      complete: () => console.log('Observable completed')
    });
  }
}
