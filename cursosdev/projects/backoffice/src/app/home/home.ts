import { Component } from '@angular/core';

@Component({
    selector: "[cdev-home]",
    template: "Hola mundo desde HomeComponent",
})
export class HomeComponent {
    constructor() {
        console.log('HomeComponent initialized');
    }
}